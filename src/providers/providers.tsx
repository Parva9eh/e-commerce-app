'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js';
import { store, persistor } from '@/store/store';
import { stripePromise } from '@/utils/stripe/stripe.utils';
import { GlobalStyle } from '@/global.styles';
import SessionChecker from './session-checker';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Elements stripe={stripePromise}>
          <GlobalStyle />
          <SessionChecker />
          {children}
        </Elements>
      </PersistGate>
    </Provider>
  );
}