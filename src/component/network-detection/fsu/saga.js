import { message } from 'antd';
import { takeLatest, put } from 'redux-saga/effects';
import * as types from './types';
import { trendSer, initSer, getProviceDataSer, login, initContentSer, getPictureSer, liveSer } from './server';
import { meteTrendSuccess, temperatureTrendSuccess, initSuccess, getProviceDataSuccess, initContentSuccess, liveSuccess, getPictureSuccess } from './actions';


function* initSaga(action) {
  const logData = yield login();
  if (logData.data.code !== 0) {
    return message.error('没有权限');
  }
  const data = yield initSer(action.props);
  return yield put(initSuccess(data));
}

function* getProviceDataSaga(action) {
  const data = yield getProviceDataSer(action.props);
  return yield put(getProviceDataSuccess(data));
}


function* initContentSaga(action) {
  const data = yield initContentSer(action.props);
  return yield put(initContentSuccess(data));
}

function* getPictureSaga(action) {
  const data = yield getPictureSer(action.props);
  return yield put(getPictureSuccess(data));
}

function* liveSaga(action) {
  const data = yield liveSer(action.props);
  return yield liveSuccess(data);
}


function* temperatureTrendSaga(action) {
  const { props } = action;
  const param = {
    deviceId: props.deviceId,
    meteId: props.meteId.temperature,
    statType: props.temperature.key,
  };
  const data = yield trendSer(param);
  return yield put(temperatureTrendSuccess(data));
}

function* meteTrendSaga(action) {
  const { props, idx } = action;
  const { meteTable } = props;
  const param = {
    deviceId: props.deviceId,
    meteId: meteTable[idx].meteId,
    statType: meteTable[idx].statType,
  };
  const data = yield trendSer(param);
  return yield put(meteTrendSuccess(data, idx));
}


function* changeTempButtonSaga(action) {
  const { props } = action;
  const param = {
    deviceId: props.deviceId,
    meteId: props.meteId.temperature,
    statType: props.temperature.key,
  };
  const data = yield trendSer(param);
  return yield put(temperatureTrendSuccess(data));
}

function* changeMeteButtonSaga(action) {
  const { props, statType, idx } = action;
  const { meteTable } = props;
  const param = {
    deviceId: props.deviceId,
    meteId: meteTable[idx].meteId,
    statType,
  };
  const data = yield trendSer(param);
  return yield put(meteTrendSuccess(data, idx));
}

export default function* () {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.getProviceData, getProviceDataSaga);
  yield takeLatest(types.initContent, initContentSaga);
  yield takeLatest(types.getPicture, getPictureSaga);

  yield takeLatest(types.live, liveSaga);

  yield takeLatest(types.temperatureTrend, temperatureTrendSaga);
  yield takeLatest(types.meteTrend, meteTrendSaga);
  yield takeLatest(types.changeTempButton, changeTempButtonSaga);
  yield takeLatest(types.changeMeteButton, changeMeteButtonSaga);
}
