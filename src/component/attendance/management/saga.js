// import hashHistory from 'shein-lib/history';
import { push } from 'react-router-redux';
import { takeLatest, put } from 'redux-saga/effects';
import * as types from './types';
import { initSer, changeCitySer } from './server';
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
  debugger;
  yield put(changeCitySuccess(data));
  return null;
}

export default function* () {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.changeCity, changeCitySaga);
}
