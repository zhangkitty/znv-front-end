import { Modal } from 'antd';
import { take, put, takeLatest } from 'redux-saga/effects';
import { initSuccess, openModalSuccess } from './action';
import * as types from './types';
import { initSer, openModalSer,updateSer } from './server';

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

}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.openModal, openModalSaga);
  yield takeLatest(types.update, updateSaga);
}

export default mainSaga;
