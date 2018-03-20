import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import assign from 'object-assign';

import hashHistory from 'shein-lib/history';
import postRedirectMiddleware from 'shein-middlewares/post-redirect';
import pageSizeMiddleware from 'shein-middlewares/pagesize';

import rootReducers, { rootSaga } from './component/index';


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

export default store;
