import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import {
  initSuccess,
  serachSuccess,
} from './action';
import * as types from './types';
import {
  getCityList,
  serachSer,
} from './server';

function* initSaga(action) {
  const data = yield getCityList();
  if (data.errCode !== 0) {
    return message.error;
  }
  yield put(initSuccess(data));
  return null;
}

function* serachSaga(action) {
  const data = yield serachSer(action.props);
  if (data.errCode !== 0) {
    return message.error;
  }
  yield put(serachSuccess(data));
  return null;
}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.serach, serachSaga);
}

export default mainSaga;
