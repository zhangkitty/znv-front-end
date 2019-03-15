import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import {
  initSuccess,
  serachSuccess,
  changePageSuccess,
  changePageSizeSuccess,
} from './action';
import * as types from './types';
import {
  getCityList,
  serachSer,
} from './server';

function* initSaga(action) {
  const data = yield getCityList();
  if (data.errCode !== 0) {
    return message.error;
  }
  yield put(initSuccess(data));
  return null;
}

function* serachSaga(action) {
  const data = yield serachSer(action.props);
  if (data.errCode !== 0) {
    return message.error;
  }
  yield put(serachSuccess(data));
  return null;
}

function* changePageSaga(action) {
  const { props, current } = action;
  const data = yield serachSer(Object.assign({}, props, {
    formData: Object.assign({}, props.formData, {
      pageNum: current,
    }),
  }));
  if (data.errCode !== 0) {
    return message.error;
  }
  yield put(changePageSuccess(data));
  return null;
}

function* changePageSizeSaga(action) {
  const { props, current, size } = action;
  const data = yield serachSer(Object.assign({}, props, {
    formData: Object.assign({}, props.formData, {
      pageSize: size,
      pageNum: current,
    }),
  }));
  if (data.errCode !== 0) {
    return message.error;
  }
  yield put(changePageSizeSuccess(data));
  return null;
}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.serach, serachSaga);
  yield takeLatest(types.changePage, changePageSaga);
  yield takeLatest(types.changePageSize, changePageSizeSaga);
}

export default mainSaga;
