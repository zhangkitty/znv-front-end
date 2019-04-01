import { Modal, message } from 'antd';
import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { createdeviceSuccess } from './action';
import * as types from './types';
import { createdeviceSer } from './server';

function* createdeviceSaga(action) {
  const { props } = action;
  const data = yield createdeviceSer(props);
  return yield put(createdeviceSuccess(data));
}


function* mainSaga() {
  yield takeLatest(types.createdevice, createdeviceSaga);
}

export default mainSaga;
