import { message } from 'antd';
import { put, takeLatest } from 'redux-saga/effects';
import { initSuccess, submitSuccess } from './action';
import * as types from './types';
import { initSer, submitSer } from './server';

function* init(action) {
  const data = yield initSer(action.props);
  if (data[0].code !== 0) {
    return message.msg;
  }
  yield put(initSuccess(data));
  return null;
}


function* submit(action) {
  const { props } = action;
  if (!props.formData.kkk[0]) {
    return message.error('统计时间不能为空');
  }
  if (!props.formData.kkk[1]) {
    return message.error('统计时间不能为空');
  }
  if (!props.choosedAims) {
    return message.error('统计目标不能为空');
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

function* mainSaga() {
  yield takeLatest(types.init, init);
  yield takeLatest(types.submit, submit);
  yield takeLatest(types.changePage, submit);
  yield takeLatest(types.changePageSize, submit);
}

export default mainSaga;
