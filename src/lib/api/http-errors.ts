import { NextResponse } from 'next/server';

/** Domain validation messages safe to return to the client. */
export const CLIENT_SAFE_ERROR_MESSAGES = new Set([
  'Cart is empty',
  'Cart items are required',
  'Invalid cart line',
  'Order total is below the minimum charge',
  'Payment intent is required',
  'Payment is not completed',
  'Payment amount does not match order total',
  'Unsupported payment currency',
  'Cart does not match payment',
  'Invalid authentication token',
  'Unauthorized order user',
  'Order email does not match signed-in user',
  'Too many payment attempts. Please try again shortly.',
  'Too many order requests. Please try again shortly.',
  'Payment service is not configured',
]);

const UNKNOWN_PRODUCT_PREFIX = 'Unknown product:';

const CONFIG_ERROR_SNIPPETS = [
  'Firebase Admin credentials are not configured',
  'Stripe secret key is not configured',
  'Payment service is not configured',
  'DECODER routines',
  'error:1E08010C',
  'Invalid PEM',
  'Failed to parse private key',
];

export const isClientSafeErrorMessage = (message: string): boolean => {
  if (CLIENT_SAFE_ERROR_MESSAGES.has(message)) {
    return true;
  }

  return message.startsWith(UNKNOWN_PRODUCT_PREFIX);
};

export const isConfigError = (error: unknown): boolean => {
  const message = error instanceof Error ? error.message : String(error ?? '');
  return CONFIG_ERROR_SNIPPETS.some((snippet) => message.includes(snippet));
};

export const toApiErrorResponse = (
  error: unknown,
  fallbackMessage: string,
  fallbackStatus = 400,
): NextResponse => {
  if (error instanceof Error && isClientSafeErrorMessage(error.message)) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Misconfigured secrets / PEM keys — surface a stable ops message, not a stack trace.
  if (isConfigError(error)) {
    console.error('[api:config]', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: 'Payment service is not configured' },
      { status: 500 },
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error('[api]', error);
  } else {
    const name = error instanceof Error ? error.name : 'Error';
    console.error('[api]', fallbackMessage, name);
  }

  return NextResponse.json({ error: fallbackMessage }, { status: fallbackStatus });
};
