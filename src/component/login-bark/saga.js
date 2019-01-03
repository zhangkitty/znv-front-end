// import hashHistory from 'shein-lib/history';
import { push } from 'react-router-redux';
import { takeLatest, put } from 'redux-saga/effects';
import * as types from './types';
import { changeValue } from './actions';
import { submitSer } from './server';
import { message } from 'antd';

function* submitSaga(action) {
  const data = yield submitSer(action.data);
  if (data.success !== true) {
    return message.error(data.message);
  }
  // hashHistory.replace('/');
  return yield put(push('/dashboard/a'));
}

export default function* () {
  yield takeLatest(types.SUBMIT, submitSaga);
}
