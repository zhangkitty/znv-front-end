/**
 * Created by zhanyaqi on 2017/8/30.
 */
import 'classnames';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import assign from 'object-assign';
import postRedirectMiddleware from './middlewares/post-redirect';
import pageSizeMiddleware from './middlewares/pagesize';
import hashHistory from './lib/history';

import rootReducers, { rootSaga } from './component/index';

import RootView from './component/root';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers(assign({
  routing: routerReducer,
}, rootReducers));

const routeMiddleware = routerMiddleware(hashHistory);

const store = createStore(reducers, compose(
  applyMiddleware(routeMiddleware, sagaMiddleware, postRedirectMiddleware, pageSizeMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));

sagaMiddleware.run(rootSaga);
const root = (
  <Provider store={store}>
    <RootView history={hashHistory} innerStore={store} />
  </Provider>
);

render(
  root,
  document.getElementById('container'),
);
