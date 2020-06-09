import { AppContainer } from 'react-hot-loader';
import { AppHot } from './app/App';
import React from 'react';
import ReactDOM from 'react-dom';

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

// Wrapped render method
const render = (Component: React.FC): void => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    mainElement,
  );
};

// Render root with hot reloading
render(AppHot);
