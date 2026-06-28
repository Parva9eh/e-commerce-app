import CheckoutSuccess from '@/routes/checkout-success/checkout-success.component';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Order Confirmed',
  description: 'Your Crown Clothing order has been confirmed.',
  path: '/checkout/success',
});

export default function CheckoutSuccessPage() {
  return <CheckoutSuccess />;
}