import { render } from 'react-dom';
import React from 'react';
import App from './App.jsx';

import { BrowserRouter } from 'react-router-dom';

import './styles/styles.css';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);
