import { Modal, message } from 'antd';
import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { initSet, searchSet, handleSet, initSuccess, submitSuccess } from './action';
import * as types from './types';
import { initSer, submitSer } from './server';

function* init(action) {
  const data = yield initSer(action.props);
  if (!data[0].success) {
    return message.error(data.msg);
  }
  if (!data[1].success) {
    return message.error(data.msg);
  }
  if (!data[2].success) {
    return message.error(data.msg);
  }
  yield put(initSuccess(data));
  return null;
}


function* submit(action) {
  const { props } = action;
  if (!props.choosedMonth) {
    return message.error('统计月份不能为空');
  }
  if (props.choosedCity === null) {
    return message.error('考核城市不能为空');
  }
  const data = yield submitSer(action.props);
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  yield put(submitSuccess(data.data));
  return null;
}

function* changePage(action) {
  const data = yield submitSer(action.props);
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  yield put(submitSuccess(data.data));
  return null;
}

function* changePageSize(action) {
  const data = yield submitSer(action.props);
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  yield put(submitSuccess(data.data));
  return null;
}

function* mainSaga() {
  yield takeLatest(types.init, init);
  yield takeLatest(types.submit, submit);
  yield takeLatest(types.changePage, changePage);
  yield takeLatest(types.changePageSize, changePageSize);
}

export default mainSaga;
