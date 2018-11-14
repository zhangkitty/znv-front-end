import { Modal, message } from 'antd';
import { take, put, fork, takeLatest } from 'redux-saga/effects';
import {
  initSuccess,
  getExceptionRateSuccess,
  changeDetailDaySuccess,
  changeTrendDaysSuccess,
  getDevicedetailSuccess,
  staffAttendanceInitSuccess,
  changeTrendDaysInTab1Success,
  changeDetailDayTab1Success,
} from './action';
import * as types from './types';
import { initSer, getExceptionRateSer, changeDetailDaySer, changeTrendDaysSer, getDevicedetailSer, staffAttendanceInitSer, changeTrendDaysInTab1Ser, changeDetailDayTab1Ser } from './server';

function* initSaga(action) {
  const { props } = action;
  const data = yield initSer(props);
  if (data[0].errCode !== 0) {
    return message.error(data[0].msg);
  }
  if (data[1].errCode !== 0) {
    return message.error(data[1].msg);
  }
  if (data[2].errCode !== 0) {
    return message.error(data[2].msg);
  }
  if (data[3].errCode !== 0) {
    return message.error(data[3].msg);
  }
  yield put(initSuccess(data));
  return null;
}

function* getExceptionRateSaga(action) {
  const { props } = action;
  const { node } = props;
  const len = node.id.split('.').length;
  const data = yield getExceptionRateSer(props);
  const t = (len === 3 || (len > 3 && node.person === true)) ? 4 : 3;
  for (let i = 0; i < t; i++) {
    if (data[i].errCode !== 0) {
      return message.error(data[0].msg);
    }
  }
  yield put(getExceptionRateSuccess(data));
  return null;
}

function* changeDetailDaySaga(action) {
  const { props } = action;
  const data = yield changeDetailDaySer(props);
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  yield put(changeDetailDaySuccess(data));
  return null;
}

function* changeTrendDaysSaga(action) {
  const { props } = action;
  const data = yield changeTrendDaysSer(props);
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  yield put(changeTrendDaysSuccess(data));
  return null;
}

function* getDevicedetailSaga(action) {
  const { props } = action;
  const data = yield getDevicedetailSer(props);
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  yield put(getDevicedetailSuccess(data.data));
  return null;
}

function* staffAttendanceInitSaga(action) {
  const { props } = action;
  const data = yield staffAttendanceInitSer(props);


  return yield put(staffAttendanceInitSuccess(data));
}


function* changeTrendDaysInTab1Saga(action) {
  const { props } = action;
  const data = yield changeTrendDaysInTab1Ser(props);
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  return yield put(changeTrendDaysInTab1Success(data));
}

function* changeDetailDayTab1Saga(action) {
  const { props } = action;
  const data = yield changeDetailDayTab1Ser(props);
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  return yield put(changeDetailDayTab1Success(data));
}

function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.getExceptionRate, getExceptionRateSaga);
  yield takeLatest(types.changeDetailDay, changeDetailDaySaga);
  yield takeLatest(types.changeTrendDays, changeTrendDaysSaga);
  yield takeLatest(types.getDevicedetail, getDevicedetailSaga);
  yield takeLatest(types.staffAttendanceInit, staffAttendanceInitSaga);
  yield takeLatest(types.changeTrendDaysInTab1, changeTrendDaysInTab1Saga);
  yield takeLatest(types.changeDetailDayTab1, changeDetailDayTab1Saga);
}

export default mainSaga;
