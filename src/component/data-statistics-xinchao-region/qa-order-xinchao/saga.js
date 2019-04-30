import { Modal, message } from 'antd';
import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { initSuccess, searchSuccess } from './action';
import * as types from './types';
import { initSer, searchSer, exportExcelSer } from './server';

function* initSaga(action) {
  const { props } = action;
  const data = yield initSer(props);
  return yield put(initSuccess(data, props));
}

function* searchSaga(action) {
  const { props } = action;
  const data = yield searchSer(props);
  return yield put(searchSuccess(data));
}

function* exportExcelSaga(action) {
  const { props } = action;
  const data = yield exportExcelSer(props);
  return null;
}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.search, searchSaga);
  yield takeLatest(types.exportExcel, exportExcelSaga);
}

export default mainSaga;
