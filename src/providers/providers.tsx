'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { ToastStyles } from '@/components/toast/toast.styles';
import { store, persistor } from '@/store/store';
import { GlobalStyle } from '@/global.styles';
import { theme } from '@/styles/theme';
import AppInitializer from './app-initializer';
import AuthSessionFeedback from './auth-session-feedback';
import BrowseOriginTracker from './browse-origin-tracker';

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
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
          <BrowseOriginTracker />
          <AuthSessionFeedback />
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}