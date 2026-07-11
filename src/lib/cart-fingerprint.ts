import { CartLineInput } from '@/lib/catalog';

/**
 * Stable fingerprint of cart lines for binding a Stripe PaymentIntent to
 * the priced cart. Sorted by product id so request order does not matter.
 */
export const buildCartFingerprint = (lines: CartLineInput[]): string => {
  return [...lines]
    .map((line) => ({
      id: Number(line.id),
      quantity: Number(line.quantity),
    }))
    .filter(
      (line) =>
        Number.isInteger(line.id) &&
        Number.isInteger(line.quantity) &&
        line.quantity >= 1,
    )
    .sort((a, b) => a.id - b.id)
    .map((line) => `${line.id}x${line.quantity}`)
    .join(',');
};

export const CART_FINGERPRINT_METADATA_KEY = 'cart_fingerprint';
