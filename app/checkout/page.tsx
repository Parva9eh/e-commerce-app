import Checkout from '@/routes/checkout/checkout.component';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Checkout',
  description: 'Review your cart and complete your Crown Clothing purchase.',
  path: '/checkout',
});

export default function CheckoutPage() {
  return <Checkout />;
}