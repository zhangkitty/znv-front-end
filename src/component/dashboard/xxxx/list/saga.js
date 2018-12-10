import { put, takeLatest } from 'redux-saga/effects';
import { initSuccess } from './action';
import * as types from './types';
import { initSer } from './server';

function* initSaga(action) {
  const data = yield initSer(action);
  yield put(initSuccess(data));
  return null;
}

function* mainSaga() {
  yield takeLatest(types.init, initSaga);

}

export default mainSaga;
