import { message } from 'antd';
import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { initSuccess, openModifyRoleModalSuccess, deleteRoleSuccess, getRoleDetailSuccess, addRoleSuccess, modifyRoleSuccess } from './action';
import * as types from './types';
import { initSer, addRoleSer, openModifyRoleModalSer, deleteRoleSer, getRoleDetailSer, submitSer, modifyRoleSer } from './server';

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
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  const data1 = yield initSer(action.props);
  yield put(addRoleSuccess(data1));
  return message.success('新增角色成功');
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
  const data1 = yield initSer(action.props);
  yield put(deleteRoleSuccess(data1));
  return message.success('删除角色成功');
}

function* getRoleDetailSaga(action) {
  const { id } = action;
  const data = yield getRoleDetailSer(id);
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  return yield put(getRoleDetailSuccess(data));
}

function* submitSaga(action) {
  const { props } = action;
  const data = yield submitSer(props);
  if (data[0].errCode !== 0) {
    return message.error(data[0].msg);
  }
  if (data[1].errCode !== 0) {
    return message.error(data[1].msg);
  }
  return message.success('配置成功');
}

function* modifyRoleSaga(action) {
  const { props } = action;
  const data = yield modifyRoleSer(props);
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  const data1 = yield initSer(action.props);
  yield put(modifyRoleSuccess(data1));
  return message.success('修改角色成功');
}

function* mainSaga() {
  yield fork(init);
  yield takeLatest(types.addRole, addRoleSaga);
  yield takeLatest(types.openModifyRoleModal, openModifyRoleModalSaga);
  yield takeLatest(types.deleteRole, deleteRoleSaga);

  yield takeLatest(types.getRoleDetail, getRoleDetailSaga);

  yield takeLatest(types.submit, submitSaga);
  yield takeLatest(types.modifyRole, modifyRoleSaga);
}

export default mainSaga;
