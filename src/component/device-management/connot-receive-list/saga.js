import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import * as types from './types';

import { initSer } from './server';
import { initSuccess } from './action';


function* initSaga(action) {
  const data = yield initSer(action.props);
  if (data.errCode !== 0) {
    return message.err(data.msg);
  }
  yield put(initSuccess(data));
  return null;
}

function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.changePage, initSaga);
  yield takeLatest(types.changePageSize, initSaga);
}

export default mainSaga;
