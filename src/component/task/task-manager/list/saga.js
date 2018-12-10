import { takeLatest } from 'redux-saga/effects';
import * as types from './types';
import { } from './server';


function* initSaga(action) {
  return null;
}

function* mainSaga() {
  yield takeLatest(types.init, initSaga);
}

export default mainSaga;
