import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { createStore } from 'redux';
import { rootReducer } from '@/store/root-reducer';
import { theme } from '@/styles/theme';
import ShopCategoriesProvider from '@/providers/shop-categories-provider';

export function renderWithProviders(
  ui,
  {
    preLoadedState = {},
    store = createStore(rootReducer, preLoadedState),
    shopCategories,
    ...renderOptions
  } = {},
) {
  const Wrapper = ({ children }) => {
    const content =
      shopCategories !== undefined ? (
        <ShopCategoriesProvider initialCategories={shopCategories}>
          {children}
        </ShopCategoriesProvider>
      ) : (
        children
      );

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>{content}</ThemeProvider>
      </Provider>
    );
  };

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
