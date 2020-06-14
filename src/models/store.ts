import { Store, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import { storeReducer } from './store.reducer';

export const configureStore = (): Store => {
  return createStore(storeReducer(), composeWithDevTools());
};
