import 'classnames';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import hashHistory from 'shein-lib/history';

import store from './createStore';

import RootView from './component/root';

const root = (
  <Provider store={store}>
    <RootView history={hashHistory} innerStore={store} />
  </Provider>
);

render(
  root,
  document.getElementById('container'),
);
