'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '@/store/cart/cart.selector';
import { selectCurrentUser } from '@/store/user/user.selector';
import { clearCart } from '@/store/cart/cart.action';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import { BUTTON_TYPE_CLASSES } from '@/components/button/button.component';
import { theme } from '@/styles/theme';
import { getFirebaseUtils } from '@/utils/firebase/firebase-api';
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

const PENDING_ORDER_KEY = 'pending-order-confirmation';

type PendingOrder = {
  paymentIntentId: string;
  items: Array<{ id: number; quantity: number }>;
};

const storePendingOrder = (pending: PendingOrder) => {
  try {
    sessionStorage.setItem(PENDING_ORDER_KEY, JSON.stringify(pending));
  } catch {
    // sessionStorage may be unavailable; ignore
  }
};

const clearPendingOrder = () => {
  try {
    sessionStorage.removeItem(PENDING_ORDER_KEY);
  } catch {
    // ignore
  }
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessingPayment(true);

    try {
      const cartPayload = cartItems.map(({ id, quantity }) => ({ id, quantity }));

      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartPayload,
          ...(currentUser?.email ? { receiptEmail: currentUser.email } : {}),
        }),
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
            email: currentUser?.email || undefined,
          },
        },
      });

      if (paymentResult.error) {
        showError(paymentResult.error.message ?? 'Payment failed');
        return;
      }

      if (paymentResult.paymentIntent?.status === 'succeeded') {
        const paymentIntentId = paymentResult.paymentIntent.id;
        const saveHeaders: Record<string, string> = {
          'Content-Type': 'application/json',
        };

        if (currentUser) {
          const firebaseUtils = await getFirebaseUtils();
          const idToken = await firebaseUtils.getCurrentUserIdToken();

          if (idToken) {
            saveHeaders.Authorization = `Bearer ${idToken}`;
          }
        }

        const saveResponse = await fetch('/api/save-order', {
          method: 'POST',
          headers: saveHeaders,
          body: JSON.stringify({
            paymentIntentId,
            userId: currentUser?.id ?? null,
            items: cartPayload,
          }),
        });

        let saveData: { error?: string; success?: boolean; persistence?: string } = {};

        try {
          saveData = (await saveResponse.json()) as typeof saveData;
        } catch {
          // non-JSON (e.g. platform HTML 500)
        }

        if (saveResponse.ok && saveData.success !== false) {
          clearPendingOrder();
          dispatch(clearCart());
          showSuccess('Payment successful');
          router.push(
            saveData.persistence === 'stripe'
              ? '/checkout/success?saved=true&store=stripe'
              : '/checkout/success?saved=true',
          );
          return;
        }

        storePendingOrder({ paymentIntentId, items: cartPayload });
        showError(
          saveData.error
            ? `Payment succeeded, but order save failed: ${saveData.error}`
            : 'Payment succeeded, but we could not save your order confirmation.',
        );
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
