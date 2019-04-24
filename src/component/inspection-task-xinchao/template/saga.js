import { Modal, message } from 'antd';
import assign from 'object-assign';
import { take, put, takeLatest } from 'redux-saga/effects';
import { initSuccess, openModalSuccess, updateSuccess } from './action';
import * as types from './types';
import { initSer, openModalSer, updateSer, changePageSer, changePageSizeSer } from './server';

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

function* changePageSaga(action) {
  const data = yield changePageSer(action);
  return yield put(initSuccess(data));
}

function* changePageSizeSaga(action) {
  const data = yield changePageSizeSer(action);
  return yield put(initSuccess(data));
}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.openModal, openModalSaga);
  yield takeLatest(types.update, updateSaga);
  yield takeLatest(types.changePage, changePageSaga);
  yield takeLatest(types.changePageSize, changePageSizeSaga);
}

export default mainSaga;
