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
  openWorkRateIncSuccess,
  openWorkTimeIncSuccess,
  openCityWorkRateIncSuccess,
  changeCityTrendDaysSuccess,
  changeCityTrendDays1Success,
  mydefineActionSuccess,
  getLastcoordinateSuccess,
} from './action';
import * as types from './types';
import { getLastcoordinateSer, mydefineActionSer, changeCityTrendDays1Ser, changeCityTrendDaysSer, openCityWorkRateIncSer, openWorkTimeIncSer, openWorkRateIncSer, initSer, getExceptionRateSer, changeDetailDaySer, changeTrendDaysSer, getDevicedetailSer, staffAttendanceInitSer, changeTrendDaysInTab1Ser, changeDetailDayTab1Ser } from './server';

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
  if (data[4].errCode !== 0) {
    return message.error(data[4].msg);
  }
  if (data[5].errCode !== 0) {
    return message.error(data[5].msg);
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
  for (const v of data) {
    if (v.errCode !== 0) {
      return message.error(v.msg);
    }
  }
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
  const { node } = props;
  const len = node.id.split('.').length;
  const data = yield changeDetailDayTab1Ser(props);

  // if (data.errCode !== 0) {
  //   return message.error(data.msg);
  // }
  return yield put(changeDetailDayTab1Success(data));
}


function* openWorkRateIncSaga(action) {
  const { props } = action;
  const data = yield openWorkRateIncSer(props);

  yield put(openWorkRateIncSuccess(data));
}

function* openWorkTimeIncSaga(action) {
  const { props } = action;
  const data = yield openWorkTimeIncSer(props);
  yield put(openWorkTimeIncSuccess(data));
}

function* openCityWorkRateIncSaga(action) {
  const { props } = action;
  const data = yield openCityWorkRateIncSer(props);
  yield put(openCityWorkRateIncSuccess(data));
}

function* changeCityTrendDaysSaga(action) {
  const { props } = action;
  const data = yield changeCityTrendDaysSer(props);
  yield put(changeCityTrendDaysSuccess(data));
}

function* changeCityTrendDays1Saga(action) {
  const { props } = action;
  const data = yield changeCityTrendDays1Ser(props);
  yield put(changeCityTrendDays1Success(data));
}

function* mydefineActionSaga(action) {
  const data = yield mydefineActionSer(action);
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  yield put(mydefineActionSuccess(data));
  return null;
}

function* getLastcoordinateSaga(action) {
  const data = yield getLastcoordinateSer(action);
  yield put(getLastcoordinateSuccess(data));
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
  yield takeLatest(types.openWorkRateInc, openWorkRateIncSaga);
  yield takeLatest(types.openWorkTimeInc, openWorkTimeIncSaga);
  yield takeLatest(types.openCityWorkRateInc, openCityWorkRateIncSaga);
  yield takeLatest(types.changeCityTrendDays, changeCityTrendDaysSaga);
  yield takeLatest(types.changeCityTrendDays1, changeCityTrendDays1Saga);
  yield takeLatest(types.mydefineAction, mydefineActionSaga);
  yield takeLatest(types.getLastcoordinate, getLastcoordinateSaga);
}

export default mainSaga;
