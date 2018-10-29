import { Modal, message } from 'antd';
import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { initSuccess } from './action';
import * as types from './types';
import { initSer } from './server';

function* initSaga(action) {
  const { props } = action;
  const data = yield initSer(props);
  if (data[0].errCode !== 0) {
    return message.error(data[0].msg);
  }
  yield put(initSuccess(data));
  return null;
}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
}

export default mainSaga;
