/**
 * Created by yeyangmei on 2017/8/28.
 */
import { takeLatest, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as types from './types';
import { changeValue } from './actions';
import showMessage from '../../lib/modal';
import logout from './server';

function* logoutWorker() {
  const data = yield logout();
  if (data.code === 0) {
    showMessage('退出成功', false);
    yield put(changeValue('ready', false));
    yield put(push('/login'));
  } else {
    showMessage(data.msg || '退出失败', false);
  }
}

export default function* () {
  yield takeLatest(types.LOGOUT, logoutWorker);
}
