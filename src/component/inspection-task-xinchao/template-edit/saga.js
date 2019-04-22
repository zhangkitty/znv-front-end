import { Modal, message } from 'antd';
import { take, put, takeLatest } from 'redux-saga/effects';
import { searchSuccess, changePageSuccess, changePageSizeSuccess } from './action';
import * as types from './types';
import { changePageSer, changePageSizeSer, searchSer, createSer } from './server';


function* searchSaga(action) {
  const { props } = action;
  const data = yield searchSer(props);
  return yield put(searchSuccess(data));
}

function* changePageSaga(action) {
  const data = yield changePageSer(action);
  return yield put(changePageSuccess(data));
}

function* changePageSizeSaga(action) {
  const data = yield changePageSizeSer(action);
  return yield put(changePageSizeSuccess(data));
}

function* createSaga(action) {
  const data = yield createSer(action);
  if (data.errCode == 0) {
    return message.success('编辑成功');
  }
  return message.error(`${data.msg}`);
}

function* mainSaga() {
  yield takeLatest(types.search, searchSaga);
  yield takeLatest(types.changePage, changePageSaga);
  yield takeLatest(types.changePageSize, changePageSizeSaga);
  yield takeLatest(types.create, createSaga);
}

export default mainSaga;
