import { takeLatest, put } from 'redux-saga/effects';
import * as types from './types';
import { changeValue } from './actions';


import login from './server';

function* loginWorker(action) {
  const data = yield login(action.data);
  if (data.code === 0) {
    window.location.href = '/';
  }
  yield put(changeValue('message', data.msg));
}

export default function* () {
  yield takeLatest(types.LOGIN, loginWorker);
}
