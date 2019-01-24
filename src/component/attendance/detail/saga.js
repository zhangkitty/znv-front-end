// import hashHistory from 'shein-lib/history';
import { push } from 'react-router-redux';
import { takeLatest, put } from 'redux-saga/effects';
import * as types from './types';
import { initSer } from './server';
import { message } from 'antd';
import { initSuccess } from './actions';

function* initSaga(action) {
  const { id, dateTime } = action;
  console.log(dateTime);
  const data = yield initSer({ id, dateTime });
  if (data[0].errCode !== 0) {
    return message.error(data[0].msg);
  }
  if (data[1].errCode !== 0) {
    return message.error(data[1].msg);
  }
  yield put(initSuccess(data));

  return null;
}

export default function* () {
  yield takeLatest(types.init, initSaga);
}
