import { Modal, message } from 'antd';
import { take, put, takeLatest } from 'redux-saga/effects';
import { initSuccess, openModalSuccess, updateSuccess } from './action';
import * as types from './types';
import { initSer, openModalSer, updateSer } from './server';

function* initSaga(action) {
  const { props } = action;
  const data = yield initSer(props);
  return yield put(initSuccess(data));
}

function* openModalSaga(action) {
  const { props } = action;
  const data = yield openModalSer(props);
  return yield put(openModalSuccess(data));
}

function* updateSaga(action) {
  const data = yield updateSer(action);
  if (data.errCode == 0) {
    return message.success('成功');
  }
  return yield put(updateSuccess(data));
}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.openModal, openModalSaga);
  yield takeLatest(types.update, updateSaga);
}

export default mainSaga;