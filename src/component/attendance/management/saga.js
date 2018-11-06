// import hashHistory from 'shein-lib/history';
import { push } from 'react-router-redux';
import { takeLatest, put } from 'redux-saga/effects';
import * as types from './types';
import { initSer } from './server';


function* initSaga(action) {
  const { props } = action;
  const data = yield initSer(props);
}

export default function* () {
  yield takeLatest(types.init, initSaga);
}
