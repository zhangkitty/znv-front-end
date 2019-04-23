import { Modal } from 'antd';
import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { initSuccess, changeDeptSuccess, searchSuccess } from './action';
import * as types from './types';
import { initSer, changeDeptSer, searchSer } from './server';
import { message } from 'antd/lib/index';

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

function* searchSaga(action) {
  const data = yield searchSer(action);
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  return yield put(searchSuccess(data));
}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.changeDept, changeDeptSaga);
  yield takeLatest(types.search, searchSaga);
}

export default mainSaga;
