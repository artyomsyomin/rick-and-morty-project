import { render } from 'react-dom';
import React from 'react';
import App from './App.jsx';

import { BrowserRouter, HashRouter } from 'react-router-dom';

import './styles/styles.css';

import { Provider } from 'react-redux';
import store from './redux/store';

render(
  <Provider store={store}>
    <BrowserRouter>
      <HashRouter>
        <App />
      </HashRouter>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
