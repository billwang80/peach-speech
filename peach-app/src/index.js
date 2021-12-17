import React from 'react';
import { render } from 'react-dom';
import './style.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

render(
  <App />,
  document.querySelector('#root')
)

serviceWorker.unregister();
