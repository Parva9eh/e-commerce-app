import { compose, createStore, applyMiddleware, Middleware } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleWare from 'redux-saga';
import { rootSaga } from './root-saga';
import { rootReducer } from './root-reducer';

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

const sagaMiddleWare = createSagaMiddleWare();
const isDev = process.env.NODE_ENV !== 'production';

const middleWares = [isDev && logger, sagaMiddleWare].filter(
  (middleware): middleware is Middleware => Boolean(middleware)
  );

const composeEnhancer =
  (isDev &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const persistedReducer = persistReducer(persistConfig, rootReducer)
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);