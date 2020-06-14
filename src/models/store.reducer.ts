import { Reducer, combineReducers } from 'redux';

import { appReducer } from './app/app.reducer';

export const storeReducer = (): Reducer => {
  return combineReducers({
    app: appReducer,
  });
};
