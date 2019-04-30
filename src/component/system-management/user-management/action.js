import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';

export const changeValue = makeActionCreator(types.changeValue, 'key', 'value');

export const getOrgTree = makeActionCreator(types.getOrgTree, 'props');

export const getOrgTreeSuccess = makeActionCreator(types.getOrgTreeSuccess, 'data');

export const addOrg = makeActionCreator(types.addOrg, 'props');
export const editOrg = makeActionCreator(types.editOrg, 'props');
export const deleteOrg = makeActionCreator(types.deleteOrg, 'props');

export const openEditOrg = makeActionCreator(types.openEditOrg, 'props');
export const openEditOrgSuccess = makeActionCreator(types.openEditOrgSuccess, 'data');
export const closeEditOrg = makeActionCreator(types.closeEditOrg);

export const getRoleTree = makeActionCreator(types.getRoleTree, 'props', 'topOrgId');
export const getRoleTreeSuccess = makeActionCreator(types.getRoleTreeSuccess, 'data');

export const getUsers = makeActionCreator(types.getUsers, 'props', 'orgId', 'topOrgId');
export const getUsersSuccess = makeActionCreator(types.getUsersSuccess, 'data');

export const changePage = makeActionCreator(types.changePage, 'props', 'current', 'orgId', 'topOrgId');
export const changePageSize = makeActionCreator(types.changePageSize, 'props', 'current', 'size', 'orgId', 'topOrgId');

export const getUserDetail = makeActionCreator(types.getUserDetail, 'props', 'userId');
export const getUserDetailSuccess = makeActionCreator(types.getUserDetailSuccess, 'data');
export const clearUserDetail = makeActionCreator(types.clearUserDetail);

export const openEditUser = makeActionCreator(types.openEditUser, 'props');
export const openEditUserSuccess = makeActionCreator(types.openEditUserSuccess, 'data');
export const closeEditUser = makeActionCreator(types.closeEditUser);

export const addUser = makeActionCreator(types.addUser, 'props');
export const editUser = makeActionCreator(types.editUser, 'props');
export const deleteUser = makeActionCreator(types.deleteUser, 'props', 'userId');
export const chgUserStatus = makeActionCreator(types.chgUserStatus, 'props', 'userId', 'status');
export const resetPwd = makeActionCreator(types.resetPwd, 'props', 'phone');

export const getCityTree = makeActionCreator(types.getCityTree, 'props');
export const getCityTreeSuccess = makeActionCreator(types.getCityTreeSuccess, 'data');

