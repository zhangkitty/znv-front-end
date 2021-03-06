import { message } from 'antd';
import { put, takeLatest } from 'redux-saga/effects';
import { getOrgTreeSuccess, closeEditOrg, openEditOrgSuccess, getUsersSuccess, getUserDetailSuccess,
  openEditUserSuccess, closeEditUser, getRoleTreeSuccess, getCityTreeSuccess } from './action';
import * as types from './types';
import { getOrgTreeSer, addOrgSer, editOrgSer, deleteOrgSer, getUsersSer, addUserSer, editUserSer,
  deleteUserSer, chgUserStatusSer, getUserDetailSer, resetPwdSer, getRoleTreeSer, getCityTreeSer } from './server';

function* getOrgTreeSaga(action) {
  const { props } = action;
  const data = yield getOrgTreeSer(props);
  if (data.success !== true) {
    return message.error(data.msg);
  }

  yield put(getOrgTreeSuccess(data));
  return null;
}

function* openEditOrgSaga(action) {
  const { props } = action;
  yield put(openEditOrgSuccess(props));
  return null;
}

function* addOrgSaga(action) {
  const { props } = action;
  const data = yield addOrgSer(props);
  if (data.success !== true) {
    return message.error(data.msg);
  }

  yield put(closeEditOrg(data));
  const data2 = yield getOrgTreeSer(props);
  if (data2.success !== true) {
    return message.error(data2.msg);
  }
  yield put(getOrgTreeSuccess(data2));
  return null;
}

function* editOrgSaga(action) {
  const { props } = action;
  const data = yield editOrgSer(props);
  if (data.success !== true) {
    return message.error(data.msg);
  }

  yield put(closeEditOrg(data));
  const data2 = yield getOrgTreeSer(props);
  if (data2.success !== true) {
    return message.error(data2.msg);
  }
  yield put(getOrgTreeSuccess(data2));
  return null;
}

function* deleteOrgSaga(action) {
  const { props } = action;
  const data = yield deleteOrgSer(props);
  yield put(closeEditOrg(data));
  if (data.success !== true) {
    return message.error(data.msg);
  }

  const data2 = yield getOrgTreeSer(props);
  if (data2.success !== true) {
    return message.error(data2.msg);
  }
  yield put(getOrgTreeSuccess(data2));
  return null;
}

function* getRoleTreeSaga(action) {
  const { topOrgId } = action;
  const data = yield getRoleTreeSer(topOrgId);
  if (data.success !== true) {
    return message.error(data.msg);
  }

  yield put(getRoleTreeSuccess(data));
  return null;
}

function* getUsersSaga(action) {
  const { props, orgId, topOrgId } = action;
  const data = yield getUsersSer(props, orgId, topOrgId);
  if (data.success !== true) {
    return message.error(data.msg);
  }

  yield put(getUsersSuccess(data.data));
  return null;
}

function* changePageSaga(action) {
  const { props, current } = action;
  const orgId = props.clickedId === '' ? props.orgId : props.clickedId.split('.')[0];
  const topOrgId = props.clickedId === '' ? props.topOrgId : props.clickedId.split('.')[1];
  const data = yield getUsersSer(Object.assign({}, props, { page: current }), orgId, topOrgId);
  if (data.success !== true) {
    return message.error(data.msg);
  }
  yield put(getUsersSuccess(data.data));
  return null;
}

function* changePageSizeSaga(action) {
  const { props, current, size } = action;
  const orgId = props.clickedId === '' ? props.orgId : props.clickedId.split('.')[0];
  const topOrgId = props.clickedId === '' ? props.topOrgId : props.clickedId.split('.')[1];
  const data = yield getUsersSer(Object.assign({}, props, {
    pageSize: size,
    page: current,
  }), orgId, topOrgId);
  if (data.success !== true) {
    return message.error(data.msg);
  }
  yield put(getUsersSuccess(data.data));
  return null;
}

function* openEditUserSaga(action) {
  const { props } = action;
  yield put(openEditUserSuccess(props));

  const topOrgId = props.clickedId.split('.')[1];
  const data = yield getRoleTreeSer(topOrgId);
  if (data.success !== true) {
    return message.error(data.msg);
  }

  yield put(getRoleTreeSuccess(data));
  return null;
}

function* addUserSaga(action) {
  const { props } = action;
  const data = yield addUserSer(props);
  if (data.success !== true) {
    return message.error(data.msg);
  }

  yield put(closeEditUser(data));
  const orgId = props.clickedId.split('.')[0];
  const topOrgId = props.clickedId.split('.')[1];
  const data2 = yield getUsersSer(props, orgId, topOrgId);
  if (data2.success !== true) {
    return message.error(data2.msg);
  }
  yield put(getUsersSuccess(data2.data));
  return null;
}

function* editUserSaga(action) {
  const { props } = action;
  const data = yield editUserSer(props);
  if (data.success !== true) {
    return message.error(data.msg);
  }

  yield put(closeEditUser(data));
  const orgId = props.clickedId.split('.')[0];
  const topOrgId = props.clickedId.split('.')[1];
  const data2 = yield getUsersSer(props, orgId, topOrgId);
  if (data2.success !== true) {
    return message.error(data2.msg);
  }
  yield put(getUsersSuccess(data2.data));
  return null;
}

function* deleteUserSaga(action) {
  const { props, userId } = action;
  const data = yield deleteUserSer({ props, userId });
  if (data.success !== true) {
    return message.error(data.msg);
  }

  const orgId = props.clickedId.split('.')[0];
  const topOrgId = props.clickedId.split('.')[1];
  const data2 = yield getUsersSer(props, orgId, topOrgId);
  if (data2.success !== true) {
    return message.error(data2.msg);
  }
  yield put(getUsersSuccess(data2.data));
  return null;
}

function* chgUserStatusSaga(action) {
  const { props, userId, status } = action;
  const orgId = props.clickedId.split('.')[0];
  const topOrgId = props.clickedId.split('.')[1];
  const data = yield chgUserStatusSer({
    props, userId, status, topOrgId,
  });
  if (data.success !== true) {
    return message.error(data.msg);
  }

  const data2 = yield getUsersSer(props, orgId, topOrgId);
  if (data2.success !== true) {
    return message.error(data2.msg);
  }
  yield put(getUsersSuccess(data2.data));
  return null;
}

function* getUserDetailSaga(action) {
  const { props, userId } = action;
  const data = yield getUserDetailSer(props, userId);
  if (data.success !== true) {
    return message.error(data.msg);
  }

  yield put(getUserDetailSuccess(data.data));
  return null;
}

function* resetPwdSaga(action) {
  const { props, phone } = action;
  const data = yield resetPwdSer(props, phone);
  if (data.success === true) {
    return message.success('重置密码成功');
  }
  return message.error(data.msg);
}


function* getCityTreeSaga(action) {
  const { props } = action;
  const data = yield getCityTreeSer(action);
  return yield put(getCityTreeSuccess(data));
}

function* mainSaga() {
  yield takeLatest(types.getOrgTree, getOrgTreeSaga);
  yield takeLatest(types.openEditOrg, openEditOrgSaga);
  yield takeLatest(types.addOrg, addOrgSaga);
  yield takeLatest(types.editOrg, editOrgSaga);
  yield takeLatest(types.deleteOrg, deleteOrgSaga);

  yield takeLatest(types.getUsers, getUsersSaga);
  yield takeLatest(types.changePage, changePageSaga);
  yield takeLatest(types.changePageSize, changePageSizeSaga);

  yield takeLatest(types.getUserDetail, getUserDetailSaga);
  yield takeLatest(types.openEditUser, openEditUserSaga);
  yield takeLatest(types.addUser, addUserSaga);
  yield takeLatest(types.editUser, editUserSaga);
  yield takeLatest(types.deleteUser, deleteUserSaga);
  yield takeLatest(types.chgUserStatus, chgUserStatusSaga);
  yield takeLatest(types.resetPwd, resetPwdSaga);

  yield takeLatest(types.getRoleTree, getRoleTreeSaga);
  yield takeLatest(types.getCityTree, getCityTreeSaga);
}

export default mainSaga;
