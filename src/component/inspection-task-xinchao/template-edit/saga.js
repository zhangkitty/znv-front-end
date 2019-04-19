import { Modal } from 'antd';
import { take, put, takeLatest } from 'redux-saga/effects';
import { searchSuccess } from './action';
import * as types from './types';
import { searchSer } from './server';
import { changePageSer, changePageSizeSer } from './server';


function* searchSaga(action) {
  const { props } = action;
  const data = yield searchSer(props);
  return yield put(searchSuccess(data));
}

function* changePageSaga(action) {
  const data = yield changePageSer(action);
  return yield put(searchSuccess(data));
}

function* changePageSizeSaga(action) {
  const data = yield changePageSizeSer(action);
  return yield put(searchSuccess(data));
}

function* mainSaga() {
  yield takeLatest(types.search, searchSaga);
  yield takeLatest(types.changePage, changePageSaga);
  yield takeLatest(types.changePageSize, changePageSizeSaga);
}

export default mainSaga;
