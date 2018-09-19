import { message } from 'antd';
import { put, takeLatest } from 'redux-saga/effects';
import { changeValue, getDeptTree, addUserSuccess } from './action';
import * as types from './types';
import {
  getDeptTreeSer,
  getUserByDeptIdSer,
  addDeptSer,
  getAllProvinceSer,
  getAllCityByProvinceIdSer,
  getAllCityByProvinceNameSer,
  addUserSer,
} from './server';


function* getDeptTreeSaga(action) {
  yield put(changeValue('ready', false));
  const data = yield getDeptTreeSer(action);
  yield put(changeValue('ready', true));
  if (data.success !== true) {
    return message.error(data.message);
  }
  yield put(changeValue('deptTree', data.data));
  return null;
}

function* getUserByDeptIdSaga(action) {
  const data = yield getUserByDeptIdSer(action);
  if (data && data.success !== true) {
    return message.error(data.message);
  }
  yield put(changeValue('dataSource', data.data.details));
  yield put(changeValue('total', data.data.total));
  return null;
}

function* addDeptSaga(action) {
  const data = yield addDeptSer(action);
  if (data.success !== true) {
    return message.error(data.message);
  }
  if (action.parentId === 0) {
    yield put(changeValue('addCustomerVisiable', false));
    yield put(getDeptTree('0'));
  } else {
    yield put(changeValue('addDeptVisiable', false));
    yield put(changeValue('addCityModalVisiable', false));
    yield put(getDeptTree('0'));
  }
  return null;
}

function* getAllProvinceSaga() {
  const data = yield getAllProvinceSer();
  if (data.success !== true) {
    return message.error(data.message);
  }
  yield put(changeValue('allProvince', data.data));
  return null;
}

function* getAllCityByProvinceIdSaga(action) {
  const data = yield getAllCityByProvinceIdSer(action);
  if (data.success !== true) {
    return message.error(data.message);
  }
  yield put(changeValue('allCity', data.data));
  return null;
}

function* getAllCityByProvinceNameSaga(action) {
  const data = yield getAllCityByProvinceNameSer(action);
  if (data.success !== true) {
    return message.error(data.message);
  }
  yield put(changeValue('allCity', data.data[0].cities));
  return null;
}

function* addUserSaga(action) {
  const data = yield addUserSer(action);
  if (data.success !== true) {
    return message.error(data.message);
  }
  yield put(changeValue('addUserVisible', false));
  yield put(addUserSuccess());
  message.success(data.message);
  return null;
}


function* mainSaga() {
  yield takeLatest(types.getDeptTree, getDeptTreeSaga);
  yield takeLatest(types.getUserByDeptId, getUserByDeptIdSaga);
  yield takeLatest(types.addDept, addDeptSaga);
  yield takeLatest(types.getAllrovince, getAllProvinceSaga);
  yield takeLatest(types.getAllCityByProvinceId, getAllCityByProvinceIdSaga);
  yield takeLatest(types.getAllCityByProvinceName, getAllCityByProvinceNameSaga);
  yield takeLatest(types.addUser, addUserSaga);
}

export default mainSaga;
