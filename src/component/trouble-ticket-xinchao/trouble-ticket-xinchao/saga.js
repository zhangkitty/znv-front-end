import { Modal, message } from 'antd';
import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { initSuccess, changeDeptSuccess, searchSuccess, queryDeviceDetailSuccess, createSuccess, openModalSuccess } from './action';
import * as types from './types';
import { initSer, changeDeptSer, searchSer, queryDeviceDetailSer, createSer, openModalSer } from './server';

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
    return message.error(`${data.msg}`);
  }
  return yield put(searchSuccess(data));
}

function* queryDeviceDetailSaga(action) {
  const data = yield queryDeviceDetailSer(action);
  if (data.errCode !== 0) {
    return message.error(`${data.msg}`);
  }
  return yield put(queryDeviceDetailSuccess(data));
}

function* createSaga(action) {
  const data = yield createSer(action);
  if (data.errCode !== 0) {
    return message.error(`${data.msg}`);
  }
  message.success('故障工单创建成功');
  return yield put(createSuccess(data));
}

function* openModalSaga(action) {
  const data = yield openModalSer(action);
  return yield put(openModalSuccess(data));
}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.changeDept, changeDeptSaga);
  yield takeLatest(types.search, searchSaga);
  yield takeLatest(types.queryDeviceDetail, queryDeviceDetailSaga);
  yield takeLatest(types.create, createSaga);
  yield takeLatest(types.openModal, openModalSaga);
}

export default mainSaga;
