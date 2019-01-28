import { message } from 'antd';
import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { initSuccess, openModifyRoleModalSuccess, deleteRoleSuccess, getRoleDetailSuccess } from './action';
import * as types from './types';
import { initSer, addRoleSer, openModifyRoleModalSer, deleteRoleSer, getRoleDetailSer } from './server';

function* init() {
  while (true) {
    const action = yield take(types.init);
    const data = yield initSer(action.props);
    yield put(initSuccess(data));
  }
}

function* addRoleSaga(action) {
  const { props } = action;
  const data = yield addRoleSer(props);
  debugger;
}

function* openModifyRoleModalSaga(action) {
  const { props } = action;
  const data = yield openModifyRoleModalSer(props);
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  return yield put(openModifyRoleModalSuccess(data));
}

function* deleteRoleSaga(action) {
  const { props } = action;
  const data = yield deleteRoleSer(props);
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  return yield put(deleteRoleSuccess(data));
}

function* getRoleDetailSaga(action) {
  const { id } = action;
  const data = yield getRoleDetailSer(id);
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  return yield put(getRoleDetailSuccess(data));
}

function* mainSaga() {
  yield fork(init);
  yield takeLatest(types.addRole, addRoleSaga);
  yield takeLatest(types.openModifyRoleModal, openModifyRoleModalSaga);
  yield takeLatest(types.deleteRole, deleteRoleSaga);

  yield takeLatest(types.getRoleDetail, getRoleDetailSaga);
}

export default mainSaga;
