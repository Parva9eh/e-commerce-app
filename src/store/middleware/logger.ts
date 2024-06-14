import { Middleware, isAction } from 'redux';

import { RootState } from '../store';

export const loggerMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    if (isAction(action) && !action.type) {
      return next(action);
    };

    console.log('currentState: ', store.getState());

    next(action);

    console.log('next state: ', store.getState());
  };