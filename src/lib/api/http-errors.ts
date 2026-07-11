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
]);

const UNKNOWN_PRODUCT_PREFIX = 'Unknown product:';

export const isClientSafeErrorMessage = (message: string): boolean => {
  if (CLIENT_SAFE_ERROR_MESSAGES.has(message)) {
    return true;
  }

  return message.startsWith(UNKNOWN_PRODUCT_PREFIX);
};

export const toApiErrorResponse = (
  error: unknown,
  fallbackMessage: string,
  fallbackStatus = 400,
): NextResponse => {
  if (error instanceof Error && isClientSafeErrorMessage(error.message)) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error('[api]', error);
  } else {
    console.error('[api]', fallbackMessage);
  }

  return NextResponse.json({ error: fallbackMessage }, { status: fallbackStatus });
};
