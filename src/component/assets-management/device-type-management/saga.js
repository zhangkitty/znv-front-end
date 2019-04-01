import { Modal, message } from 'antd';
import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { submitSuccess, initSuccess, savedevicetypeSuccess, submit } from './action';
import * as types from './types';
import { submitSer, initSer, savedevicetypeSer, deleteDeviceTypeSer } from './server';


function* initSaga(action) {
  const { props } = action;
  const data = yield initSer(props);
  yield put(initSuccess(data));
}


function* submitSaga(action) {
  const { props } = action;
  const data = yield submitSer(props);
  yield put(submitSuccess(data));
}


function* savedevicetypeSaga(action) {
  const { props } = action;
  const data = yield savedevicetypeSer(props);
  if (data.errCode === 0) {
    message.success('成功');
  }
  yield put(savedevicetypeSuccess(data));
  yield put(submit(props));
  return null;
}

function* deleteDeviceTypeSaga(action) {
  const { props, deviceType } = action;
  const data = yield deleteDeviceTypeSer({ props, deviceType });
  if (data.errCode === 0) {
    message.success('成功');
  }
  yield put(savedevicetypeSuccess(data));
  yield put(submit(props));
  return null;
}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.submit, submitSaga);
  yield takeLatest(types.savedevicetype, savedevicetypeSaga);
  yield takeLatest(types.deleteDeviceType, deleteDeviceTypeSaga);
}

export default mainSaga;
