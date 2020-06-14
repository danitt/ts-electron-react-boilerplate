import './App.scss';

import * as React from 'react';

import { getStoreValue, setStoreValue } from '@src/utils/store';

import { StoreState } from '@src/models/store.types';
import { hot } from 'react-hot-loader/root';
import { useSelector } from 'react-redux';

export const App: React.FC = () => {
  // Read from Redux store
  const appStore = useSelector((state: StoreState) => state.app);
  console.info('test redux store value', appStore);

  // RW to file store
  setStoreValue('test', { value: 'example' });
  const getTestValue = getStoreValue('test');
  console.info('test file store value', getTestValue);

  return <div className="app">Hello Home!</div>;
};

export const AppHot = hot(App);
