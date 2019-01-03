// import hashHistory from 'shein-lib/history';
import { push } from 'react-router-redux';
import { takeLatest, put } from 'redux-saga/effects';
import * as types from './types';
import { serachSer,initSer, changeCitySer } from './server';
import { initSerSuccess, changeCitySuccess } from './actions';


function* initSaga(action) {
  const { props } = action;
  const data = yield initSer(props);
  yield put(initSerSuccess(data));
  return null;
}

function* changeCitySaga(action) {
  const { props, d } = action;
  const data = yield changeCitySer({ props, d });
  yield put(changeCitySuccess(data));
  return null;
}

function* searchSaga(action) {
  const {props} = action;
  const data = yield serachSer(props);

}

export default function* () {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.changeCity, changeCitySaga);
  yield takeLatest(types.search, searchSaga);
}
