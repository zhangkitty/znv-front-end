// import hashHistory from 'shein-lib/history';
import { push } from 'react-router-redux';
import { takeLatest, put } from 'redux-saga/effects';
import * as types from './types';
import { changeValue } from './actions';
import { submitSer } from './server';
import { message } from 'antd';

function* submitSaga(action) {
  const data = yield submitSer(action.data);
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  localStorage.setItem('token', data.data.token);
  localStorage.setItem('tokenDate', new Date().format('yyyy-MM-dd'));
  localStorage.setItem('userName', data.data.userName);
  localStorage.setItem('topOrgId', data.data.topOrgId);
  return yield put(push('/dashboard/ppppp'));
}

export default function* () {
  yield takeLatest(types.SUBMIT, submitSaga);
}
