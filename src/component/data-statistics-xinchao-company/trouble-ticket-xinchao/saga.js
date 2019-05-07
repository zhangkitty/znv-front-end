import { Modal, message } from 'antd';
import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { initSuccess, searchSuccess, chooseSuccess } from './action';
import * as types from './types';
import { initSer, searchSer, exportExcelSer, choooseSer } from './server';

const ExportJsonExcel = require('js-export-excel');


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

function* chooseSaga(action) {
  const data = yield choooseSer(action);
  return yield put(chooseSuccess(data));
}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.search, searchSaga);
  yield takeLatest(types.exportExcel, exportExcelSaga);
  yield takeLatest(types.choose, chooseSaga);
}

export default mainSaga;
