import './App.scss';

import * as React from 'react';

import { hot } from 'react-hot-loader/root';

export const App: React.FC = () => <div className="app">Hello Home!</div>;

export const AppHot = hot(App);
