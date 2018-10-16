import { Modal, message } from 'antd';
import { push } from 'react-router-redux';
import { put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import { submitSer, downloadSer } from './server';
import { submitSuccess } from './action';


function add(a, b) {
  let result = 0;
  if (a) {
    result += 1;
  }
  if (b) {
    result += 1;
  }
  return result;
}

function* submitSaga(action) {
  const { props } = action;
  if (add(props.formData.dataPicker, props.formData.choosedMonth) !== 1) {
    return message.error('统计日期和统计月份必须有且只能选一个');
  }
  const data = yield submitSer(action.props);
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  yield put(submitSuccess(data.data));
  return null;
}

function* downloadSaga(action) {
  const { props } = action;
  if (add(props.formData.dataPicker, props.formData.choosedMonth) !== 1) {
    return message.error('统计日期和统计月份必须有且只能选一个');
  }
  const test = {
    dataTime: props.formData.choosedMonth && `${props.formData.choosedMonth.slice(0, 4)}-${props.formData.choosedMonth.slice(4)}`,
    dayTime: props.formData.dataPicker && props.formData.dataPicker.format('YYYY-MM-DD'),
    type: props.formData.radioValue,
  };
  const arr = [];
  for (const [key, value] of Object.entries(test)) {
    if (value) {
      arr.push(`${key}=${value}`);
    }
  }
  window.location.href = `${process.env.BASE_URI}/rqs/balance/detail/download?${arr.join('&')}`;
  return null;
}

function* changePageSaga(action) {
  const { props } = action;
  if (add(props.formData.dataPicker, props.formData.choosedMonth) !== 1) {
    return message.error('统计日期和统计月份必须有且只能选一个');
  }
  const data = yield submitSer(action.props);
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  yield put(submitSuccess(data.data));
  return null;
}

function* changePageSize(action) {
  const { props } = action;
  if (add(props.formData.dataPicker, props.formData.choosedMonth) !== 1) {
    return message.error('统计日期和统计月份必须有且只能选一个');
  }
  const data = yield submitSer(action.props);
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  yield put(submitSuccess(data.data));
  return null;
}

function* mainSaga() {
  yield takeLatest(types.submit, submitSaga);

  yield takeLatest(types.download, downloadSaga);

  yield takeLatest(types.changePage, changePageSaga);

  yield takeLatest(types.changePageSize, changePageSize);
}

export default mainSaga;
