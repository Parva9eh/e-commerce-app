import { getServiceAccountAccessToken } from '@/lib/google-auth-rest';

type FirestoreValue =
  | { nullValue: null }
  | { stringValue: string }
  | { integerValue: string }
  | { doubleValue: number }
  | { booleanValue: boolean }
  | { timestampValue: string }
  | { mapValue: { fields: Record<string, FirestoreValue> } }
  | { arrayValue: { values: FirestoreValue[] } };

const toFirestoreValue = (value: unknown): FirestoreValue => {
  if (value === null || value === undefined) {
    return { nullValue: null };
  }

  if (value instanceof Date) {
    return { timestampValue: value.toISOString() };
  }

  if (typeof value === 'string') {
    return { stringValue: value };
  }

  if (typeof value === 'boolean') {
    return { booleanValue: value };
  }

  if (typeof value === 'number') {
    if (Number.isInteger(value)) {
      return { integerValue: String(value) };
    }
    return { doubleValue: value };
  }

  if (Array.isArray(value)) {
    return {
      arrayValue: {
        values: value.map((entry) => toFirestoreValue(entry)),
      },
    };
  }

  if (typeof value === 'object') {
    const fields: Record<string, FirestoreValue> = {};
    for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
      fields[key] = toFirestoreValue(entry);
    }
    return { mapValue: { fields } };
  }

  return { stringValue: String(value) };
};

const toFirestoreDocument = (data: Record<string, unknown>): { fields: Record<string, FirestoreValue> } => {
  const fields: Record<string, FirestoreValue> = {};
  for (const [key, value] of Object.entries(data)) {
    fields[key] = toFirestoreValue(value);
  }
  return { fields };
};

const getProjectId = (): string => {
  const projectId =
    process.env.FIREBASE_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!projectId) {
    throw new Error('Firebase Admin credentials are not configured');
  }

  return projectId;
};

export type CreateOrderResult = {
  created: boolean;
  duplicate: boolean;
};

/**
 * Create (or no-op on conflict) an order document via Firestore REST.
 * documentId is the paymentIntentId for idempotency.
 */
export const createOrderDocument = async (
  paymentIntentId: string,
  data: Record<string, unknown>,
): Promise<CreateOrderResult> => {
  const projectId = getProjectId();
  const accessToken = await getServiceAccountAccessToken([
    'https://www.googleapis.com/auth/datastore',
    'https://www.googleapis.com/auth/cloud-platform',
  ]);

  const url = new URL(
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/orders`,
  );
  url.searchParams.set('documentId', paymentIntentId);

  const payload = {
    ...toFirestoreDocument({
      ...data,
      createdAt: new Date(),
    }),
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (response.ok) {
    return { created: true, duplicate: false };
  }

  // Already exists — idempotent success
  if (response.status === 409) {
    return { created: false, duplicate: true };
  }

  const errorBody = await response.text();
  console.error('[api] firestore create order failed', response.status, errorBody.slice(0, 500));
  throw new Error('Unable to save order');
};
