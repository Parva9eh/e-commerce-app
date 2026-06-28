'use client';

import { useState, FormEvent } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from '@/store/cart/cart.selector';
import { selectCurrentUser } from '@/store/user/user.selector';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { BUTTON_TYPE_CLASSES } from '@/components/button/button.component';
import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";

const PaymentForm = () =>{
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!stripe || !elements)
            return;

        setIsProcessingPayment(true);

        try {
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: amount * 100 }),
            });

            const { clientSecret } = await response.json();
            if (!clientSecret) {
                alert('Unable to initialize payment. Please try again.');
                return;
            }

            const cardDetails = elements.getElement(CardElement);
            if (!cardDetails) return;

            const paymentResult = await stripe.confirmCardPayment(clientSecret,{
                payment_method: {
                    card: cardDetails,
                    billing_details:{
                        name: currentUser ? currentUser.displayName : 'Guest'
                    }
                }
            });

            if(paymentResult.error)
                alert(paymentResult.error.message);
            else if(paymentResult.paymentIntent?.status === 'succeeded')
                alert('Payment Successful');
        } catch {
            alert('Payment failed. Please try again.');
        } finally {
            setIsProcessingPayment(false);
        }
    }
    return(
        <PaymentFormContainer>
            <h2>Credit Card Payment:</h2>
            <FormContainer onSubmit={paymentHandler}>
                <CardElement />
                <PaymentButton 
                    buttonType={BUTTON_TYPE_CLASSES.inverted}
                    isLoading={isProcessingPayment}
                > 
                    Pay now
                </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm;