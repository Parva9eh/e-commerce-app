import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './root-reducer';
import {logger} from 'redux-logger';

// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(
    Boolean
  );

// const persistConfig = {
//   key: 'root',
//   storage,
//   blacklist: ['user']
// }

// const composeEnhancer =
//   (process.env.NODE_ENV !== 'production' &&
//     window &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

// const persistedReducer = persistReducer(persistConfig, rootReducer)
// const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
    //serializableCheck: false    This will inactivate the serializableCheck middleware.
  }).concat(middleWares)
})
// export const persistor = persistStore(store);