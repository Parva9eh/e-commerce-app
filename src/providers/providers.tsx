'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { Elements } from '@stripe/react-stripe-js';
import { ToastStyles } from '@/components/toast/toast.styles';
import { store, persistor } from '@/store/store';
import { stripePromise } from '@/utils/stripe/stripe.utils';
import { GlobalStyle } from '@/global.styles';
import { theme } from '@/styles/theme';
import AppInitializer from './app-initializer';
import CategoriesHydrator from './categories-hydrator';
import { Category } from '@/store/categories/category.types';

type ProvidersProps = {
  children: React.ReactNode;
  initialCategories?: Category[];
};

export default function Providers({ children, initialCategories }: ProvidersProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Elements stripe={stripePromise}>
            <GlobalStyle />
            <ToastStyles />
            <Toaster
              position="top-center"
              toastOptions={{
                className: 'crwn-toast',
                duration: 4000,
              }}
            />
            <AppInitializer />
            <CategoriesHydrator categories={initialCategories} />
            {children}
          </Elements>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}