import { Modal, message } from 'antd';
import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { initSuccess, getExceptionRateSuccess } from './action';
import * as types from './types';
import { initSer, getExceptionRateSer } from './server';

function* initSaga(action) {
  const { props } = action;
  const data = yield initSer(props);
  if (data[0].errCode !== 0) {
    return message.error(data[0].msg);
  }
  if (data[1].errCode !== 0) {
    return message.error(data[1].msg);
  }
  if (data[2].errCode !== 0) {
    return message.error(data[2].msg);
  }
  yield put(initSuccess(data));
  return null;
}

function* getExceptionRateSaga(action) {
  const { props } = action;
  const data = yield getExceptionRateSer(props);
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  yield put(getExceptionRateSuccess(data.data));
  return null;
}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.getExceptionRate, getExceptionRateSaga);
}

export default mainSaga;
