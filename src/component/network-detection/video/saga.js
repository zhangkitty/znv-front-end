import { take, put, fork, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import { initSer } from './server';
import { initSuccess } from './action';

function* initSaga(action) {
  const data = yield initSer(action.id);
  yield put(initSuccess(data));
}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
}

export default mainSaga;
