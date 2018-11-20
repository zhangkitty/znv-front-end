import { put, takeLatest } from 'redux-saga/effects';
import { initSer, login } from './server';
import * as types from './types';


function* initSaga(action) {
  const { props } = action;
  const logData = yield login();
  debugger;
  const data = yield initSer(props);

  return null;
}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
}

export default mainSaga;
