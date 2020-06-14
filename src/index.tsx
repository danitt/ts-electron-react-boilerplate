import { AppContainer } from 'react-hot-loader';
import { AppHot } from './app/App';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import { configureStore } from '@src/models/store';

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

// Initialise Redux store
const store = configureStore();

// Wrapped render method
const render = (Component: React.FC): void => {
  ReactDOM.render(
    <AppContainer>
      <StoreProvider store={store}>
        <Component />
      </StoreProvider>
    </AppContainer>,
    mainElement,
  );
};

// Render root with hot reloading
render(AppHot);
