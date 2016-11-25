import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import routes from '../common/routes';
import '../../scss/main.scss';

const preloadedState = window.__PRELOADED_STATE__;
const store = createStore((state) => state, preloadedState);

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('root')
);