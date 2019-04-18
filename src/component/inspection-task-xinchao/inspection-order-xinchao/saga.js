import { Modal } from 'antd';
import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { initSuccess, changeDeptSuccess } from './action';
import * as types from './types';
import { initSer, changeDeptSer } from './server';

function* initSaga(action) {
  const { props } = action;
  const data = yield initSer(props);
  return yield put(initSuccess(data));
}


function* changeDeptSaga(action) {
  const { props, v } = action;
  const data = yield changeDeptSer(props, v);
  return yield put(changeDeptSuccess(data));
}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.changeDept, changeDeptSaga);
}

export default mainSaga;
