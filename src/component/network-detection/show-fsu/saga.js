import { put, takeLatest } from 'redux-saga/effects';
import { initSer, login, searchSer } from './server';
import * as types from './types';
import { message } from 'antd';
import { initSuccess, searchSuccess } from './action';


function* initSaga(action) {
  const { props } = action;
  const logData = yield login();
  if (logData.data.code !== 0) {
    return message.error('没有权限');
  }
  const data = yield initSer(props);
  if (data.code !== 0) {
    return null;
  }
  yield put(initSuccess(data));
  return null;
}

function* searchSaga(action) {
  const { props } = action;
  const data = yield searchSer(props);
  if (data.data.code !== 0) {
    return message.error('获取数据错误');
  }
  yield put(searchSuccess(data.data));
  return null;
}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.search, searchSaga);
  yield takeLatest(types.changePage, searchSaga);
  yield takeLatest(types.changePageSize, searchSaga);
}

export default mainSaga;
