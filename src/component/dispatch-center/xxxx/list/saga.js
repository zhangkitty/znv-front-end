import { put, takeLatest } from 'redux-saga/effects';
import { initSuccess } from './action';
import * as types from './types';
import { initSer } from './server';

function* initSaga(action) {
  console.log('bbbb');
  const data = yield initSer(action.props);
  yield put(initSuccess(data));
  return null;
}

function* mainSaga() {
  yield takeLatest(types.init, initSaga);
}

export default mainSaga;
