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
  localStorage.setItem('token', data.data.tokenMap.accessToken);
  localStorage.setItem('tokenDate', new Date().format('yyyy-MM-dd'));
  localStorage.setItem('userName', data.data.userName);
  localStorage.setItem('topOrgId', data.data.custId);
  localStorage.setItem('userId', data.data.userId);
  data.data.custId ? localStorage.setItem('type', data.data.custId) : localStorage.setItem('type', '11000002');
  data.data.custId ? localStorage.setItem('isAdmin', false) : localStorage.setItem('isAdmin', true);
  return yield put(push('/dashboard/index'));
}

export default function* () {
  yield takeLatest(types.SUBMIT, submitSaga);
}
