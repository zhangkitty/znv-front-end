/**
 * Created by zhanyaqi on 2017/8/30.
 */
import 'babel-polyfill';
import 'lodash';
import 'classnames';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import postRedirectMiddleware from './middlewares/post-redirect';
import pageSizeMiddleware from './middlewares/pagesize';

import rootReducers, { rootSaga } from './component/index';

import RootView from './component/root';

const sagaMiddleware = createSagaMiddleware();

// Add the reducer to your store on the `routing` key
const reducers = combineReducers(rootReducers);

const routeMiddleware = routerMiddleware(hashHistory);

const store = createStore(reducers, compose(
  applyMiddleware(routeMiddleware, sagaMiddleware, postRedirectMiddleware, pageSizeMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));

const history = syncHistoryWithStore(hashHistory, store);

sagaMiddleware.run(rootSaga);
const root = (
  <Provider store={store}>
    <RootView history={history} innerStore={store} />
  </Provider>
);

render(
  root,
  document.getElementById('container'),
);
