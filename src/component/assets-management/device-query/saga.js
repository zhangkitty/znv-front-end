import { Modal, message } from 'antd';
import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { initSuccess, querylistSuccess } from './action';
import * as types from './types';
import { initSer, querylistSer } from './server';


function* initSaga(action) {
  const { props } = action;
  const data = yield initSer(props);
  return yield put(initSuccess(data));
}

function* querylistSaga(action) {
  const { props } = action;
  const data = yield querylistSer(props);

  return yield put(querylistSuccess(data));
}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.querylist, querylistSaga);
}

export default mainSaga;
