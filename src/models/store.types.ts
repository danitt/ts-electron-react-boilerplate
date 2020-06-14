import { AppState } from './app/app.types';
import { DispatchProp } from 'react-redux';

export interface RootState {
  app: AppState;
}

// State with Store
export type StoreState = RootState & DispatchProp;
