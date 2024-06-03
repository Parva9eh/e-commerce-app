import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import { CartProvider } from './context/cart.context';
import {store} from './store/store';

import './index.scss';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
            <CartProvider>
              <App />
            </CartProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

