import { take, put, fork, takeLatest } from 'redux-saga/effects';
import assign from 'object-assign';
import { message } from 'antd';
import {
  initSuccess,
  serachSuccess,
} from './action';
import * as types from './types';
import {
  initSer,
  serachSer,
} from './server';

function* initSaga(action) {
  const data = yield initSer(action.props);
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
  const data = yield serachSer(assign({}, action.props, {
    formData: assign({}, action.props.formData, {
      pageNum: action.current,
    }),
  }));
  if (data.errCode !== 0) {
    return message.error;
  }
  yield put(serachSuccess(data));
  return null;
}

function* changePageSizeSaga(action) {
  const data = yield serachSer(assign({}, action.props, {
    formData: assign({}, action.props.formData, {
      pageNum: action.current,
      pageSize: action.size,
    }),
  }));
  if (data.errCode !== 0) {
    return message.error;
  }
  yield put(serachSuccess(data));
  return null;
}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.serach, serachSaga);
  yield takeLatest(types.changePage, changePageSaga);
  yield takeLatest(types.changePageSize, changePageSizeSaga);
}

export default mainSaga;
