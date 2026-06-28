import { CartLineInput } from '@/lib/catalog';

export type CartItemsRequestBody = {
  items?: Array<{ id?: unknown; quantity?: unknown }>;
};

export const parseCartLineInputs = (body: CartItemsRequestBody): CartLineInput[] => {
  if (!Array.isArray(body.items) || !body.items.length) {
    throw new Error('Cart items are required');
  }

  return body.items.map((item) => ({
    id: Number(item.id),
    quantity: Number(item.quantity),
  }));
};