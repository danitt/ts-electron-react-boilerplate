import { AppState } from './app.types';
import { Reducer } from 'redux';

const initialState: AppState = {
  value: 'example',
};

export const appReducer: Reducer<AppState> = (state = initialState, action) => {
  const {
    type,
    // payload,
  } = action;

  switch (type) {
    default:
      return { ...state };
  }
};
