#!/usr/bin/env node
/**
 * Production checkout smoke checks (guest full path + signed-in auth contract).
 * Usage: node scripts/smoke-checkout.mjs
 * Requires local .env (same secrets as the app; never printed).
 */
import { createSign } from 'crypto';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import Stripe from 'stripe';

const ROOT = resolve(import.meta.dirname, '..');
const BASE_URL =
  process.env.SMOKE_BASE_URL || 'https://e-commerce-crwn-clothing.vercel.app';

const loadEnv = () => {
  const raw = readFileSync(resolve(ROOT, '.env'), 'utf8');
  for (const line of raw.split('\n')) {
    if (!line || line.startsWith('#') || !line.includes('=')) continue;
    const i = line.indexOf('=');
    let v = line.slice(i + 1);
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    const k = line.slice(0, i);
    if (!process.env[k]) process.env[k] = v;
  }
};

const normalizePrivateKey = (raw) => {
  if (!raw) return undefined;
  let key = raw.trim();
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }
  return key.replace(/\\n/g, '\n');
};

const base64Url = (value) => {
  const buf = Buffer.isBuffer(value) ? value : Buffer.from(value);
  return buf.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};

const getAccessToken = async () => {
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY);
  if (!clientEmail || !privateKey) {
    throw new Error('Missing FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY');
  }
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64Url(
    JSON.stringify({
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/datastore',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsigned = `${header}.${claim}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsigned);
  signer.end();
  const assertion = `${unsigned}.${base64Url(signer.sign(privateKey))}`;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`token error: ${JSON.stringify(data)}`);
  return data.access_token;
};

const pass = (name) => console.log(`  PASS  ${name}`);
const fail = (name, detail) => {
  console.error(`  FAIL  ${name}${detail ? ` — ${detail}` : ''}`);
  process.exitCode = 1;
};

loadEnv();

const stripeKey = process.env.STRIPE_SECRET_KEY?.trim();
const projectId =
  process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const stripe = stripeKey ? new Stripe(stripeKey) : null;

console.log(`Smoke base: ${BASE_URL}\n`);

console.log('1) Env check');
const envChecks = [
  ['STRIPE_SECRET_KEY', Boolean(stripeKey)],
  ['NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)],
  ['NEXT_PUBLIC_FIREBASE_API_KEY', Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY)],
  ['NEXT_PUBLIC_FIREBASE_PROJECT_ID', Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)],
  ['FIREBASE_CLIENT_EMAIL', Boolean(process.env.FIREBASE_CLIENT_EMAIL)],
  ['FIREBASE_PRIVATE_KEY', Boolean(process.env.FIREBASE_PRIVATE_KEY)],
];
for (const [name, ok] of envChecks) {
  if (ok) pass(name);
  else fail(name, 'missing in .env');
}
if (!process.env.FIREBASE_PROJECT_ID && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
  pass('FIREBASE_PROJECT_ID falls back to NEXT_PUBLIC_FIREBASE_PROJECT_ID');
}

if (!stripe) {
  fail('stripe client', 'cannot run paid smoke without STRIPE_SECRET_KEY');
  process.exit(process.exitCode || 1);
}

console.log('\n2) Guest checkout (create → confirm → save)');
const createRes = await fetch(`${BASE_URL}/api/create-payment-intent`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ items: [{ id: 1, quantity: 1 }] }),
});
const createBody = await createRes.json();
if (createRes.status === 200 && createBody.clientSecret) pass('create-payment-intent 200');
else fail('create-payment-intent', `${createRes.status} ${JSON.stringify(createBody)}`);

const piId = createBody.clientSecret?.split('_secret_')[0];
if (!piId) {
  console.error('\nStopping early.');
  process.exit(1);
}

const confirmed = await stripe.paymentIntents.confirm(piId, {
  payment_method: 'pm_card_visa',
});
if (confirmed.status === 'succeeded') pass(`stripe confirm ${piId}`);
else fail('stripe confirm', confirmed.status);

const saveRes = await fetch(`${BASE_URL}/api/save-order`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    paymentIntentId: piId,
    userId: null,
    items: [{ id: 1, quantity: 1 }],
  }),
});
const saveBody = await saveRes.json();
if (saveRes.status === 200 && saveBody.success) {
  pass(`save-order 200 persistence=${saveBody.persistence || 'unknown'}`);
} else {
  fail('save-order', `${saveRes.status} ${JSON.stringify(saveBody)}`);
}

console.log('\n3) Firestore order doc');
try {
  const token = await getAccessToken();
  const docRes = await fetch(
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/orders/${piId}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (docRes.ok) {
    const doc = await docRes.json();
    const cents = doc.fields?.amountCents?.integerValue;
    pass(`orders/${piId} exists amountCents=${cents}`);
  } else if (saveBody.persistence === 'stripe') {
    pass('no firestore doc (stripe fallback) — expected if SA write skipped');
  } else {
    fail('firestore order', `HTTP ${docRes.status}`);
  }
} catch (e) {
  fail('firestore order', e.message);
}

console.log('\n4) Stripe recent payments');
const recent = await stripe.paymentIntents.list({ limit: 3 });
const found = recent.data.find((p) => p.id === piId);
if (found?.status === 'succeeded') pass(`PI ${piId} succeeded in Stripe`);
else fail('stripe list', 'smoke PI not found or not succeeded');
for (const p of recent.data) {
  console.log(
    `       ${p.id}  ${p.status}  ${p.amount}¢  fingerprint=${p.metadata?.cart_fingerprint || '-'}`,
  );
}

console.log('\n5) Signed-in auth contract (no browser session)');
const noToken = await fetch(`${BASE_URL}/api/save-order`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    paymentIntentId: piId,
    userId: 'someone',
    items: [{ id: 1, quantity: 1 }],
  }),
});
const noTokenBody = await noToken.json();
if (noToken.status === 401 && noTokenBody.error === 'Unauthorized order user') {
  pass('userId without token → 401 Unauthorized order user');
} else {
  fail('userId without token', `${noToken.status} ${JSON.stringify(noTokenBody)}`);
}

const badToken = await fetch(`${BASE_URL}/api/save-order`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer not.a.real.token',
  },
  body: JSON.stringify({
    paymentIntentId: piId,
    userId: 'someone',
    items: [{ id: 1, quantity: 1 }],
  }),
});
const badTokenBody = await badToken.json();
if (badToken.status === 401 && badTokenBody.error === 'Invalid authentication token') {
  pass('bad bearer token → 401 Invalid authentication token');
} else {
  fail('bad bearer token', `${badToken.status} ${JSON.stringify(badTokenBody)}`);
}
console.log(
  '       note: full signed-in UI path needs a browser session (API key referrer rules block custom-token exchange from Node)',
);

console.log(process.exitCode ? '\nSmoke finished with failures.' : '\nSmoke finished OK.');
process.exit(process.exitCode || 0);
