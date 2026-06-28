'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartTotal, selectCartItems } from '@/store/cart/cart.selector';
import { selectCurrentUser } from '@/store/user/user.selector';
import { clearCart } from '@/store/cart/cart.action';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import { BUTTON_TYPE_CLASSES } from '@/components/button/button.component';
import { theme } from '@/styles/theme';
import { showError, showSuccess } from '@/utils/toast/toast.utils';
import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
  CardElementWrapper,
} from './payment-form.styles';

const CARD_ELEMENT_OPTIONS: StripeCardElementOptions = {
  style: {
    base: {
      fontSize: theme.fontSizes.body,
      color: theme.colors.text,
      fontFamily: theme.fonts.primary,
      '::placeholder': {
        color: theme.colors.textSubtle,
      },
    },
    invalid: {
      color: theme.colors.error,
    },
  },
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const dispatch = useDispatch();
  const amount = useSelector(selectCartTotal);
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessingPayment(true);

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: Math.round(amount * 100) }),
      });

      const data = await response.json();

      if (!response.ok || !data.clientSecret) {
        showError(data.error ?? 'Unable to initialize payment. Please try again.');
        return;
      }

      const { clientSecret } = data;

      const cardDetails = elements.getElement(CardElement);
      if (!cardDetails) return;

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardDetails,
          billing_details: {
            name: currentUser ? currentUser.displayName : 'Guest',
          },
        },
      });

      if (paymentResult.error) {
        showError(paymentResult.error.message ?? 'Payment failed');
        return;
      }

      if (paymentResult.paymentIntent?.status === 'succeeded') {
        const saveResponse = await fetch('/api/save-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentIntentId: paymentResult.paymentIntent.id,
            userId: currentUser?.id ?? null,
            userEmail: currentUser?.email ?? null,
            amount,
            items: cartItems,
          }),
        });

        const orderSaved = saveResponse.ok;
        dispatch(clearCart());

        if (orderSaved) {
          showSuccess('Payment successful');
          router.push('/checkout/success?saved=true');
          return;
        }

        showError('Payment succeeded, but we could not save your order confirmation.');
        router.push('/checkout/success?saved=false');
      }
    } catch {
      showError('Payment failed. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <PaymentFormContainer>
      <h2>Credit Card Payment</h2>
      <FormContainer onSubmit={paymentHandler}>
        <CardElementWrapper>
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </CardElementWrapper>
        <PaymentButton buttonType={BUTTON_TYPE_CLASSES.inverted} isLoading={isProcessingPayment}>
          Pay now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;