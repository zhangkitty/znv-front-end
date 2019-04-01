import { Modal, message } from 'antd';
import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { initSuccess, queryrecordlistSuccess } from './action';
import * as types from './types';
import { initSer, queryrecordlistSer } from './server';


function* initSaga(action) {
  const { props } = action;
  const data = yield initSer(props);
  return yield put(initSuccess(data));
}

function* queryrecordlistSaga(action) {
  const { props } = action;
  const data = yield queryrecordlistSer(props);

  return yield put(queryrecordlistSuccess(data));
}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.queryrecordlist, queryrecordlistSaga);
}

export default mainSaga;
