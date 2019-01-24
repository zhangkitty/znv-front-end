import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import {
  initSuccess,
  serachSuccess,
  getLifeTimeSuccess,
} from './action';
import * as types from './types';
import {
  getCityList,
  serachSer,
  getLifeTimeSer,
} from './server';

function* initSaga(action) {
  const data = yield getCityList();
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  yield put(initSuccess(data));
  return null;
}

function* serachSaga(action) {
  const data = yield serachSer(action.props);
  if (data.errCode !== 0) {
    return message.error(data.msg);
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
    return message.error(data.msg);
  }
  yield put(serachSuccess(data));
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
    return message.error(data.msg);
  }
  yield put(serachSuccess(data));
  return null;
}

function* getLifeTimeSaga(action) {
  const { taskId } = action;
  const data = yield getLifeTimeSer(taskId);
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  yield put(getLifeTimeSuccess(data));
  return null;
}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.serach, serachSaga);
  yield takeLatest(types.changePage, changePageSaga);
  yield takeLatest(types.changePageSize, changePageSizeSaga);
  yield takeLatest(types.getLifeTime, getLifeTimeSaga);
}

export default mainSaga;
