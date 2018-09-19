import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';

export const changeValue = makeActionCreator(types.changeValue, 'key', 'value');

export const getDeptTree = makeActionCreator(types.getDeptTree, 'level');

export const getUserByDeptId = makeActionCreator(types.getUserByDeptId, 'props');

export const changePage = makeActionCreator(types.changePage, 'props');

export const changePageSize = makeActionCreator(types.changePageSize, 'props');

export const addDept = makeActionCreator(types.addDept, 'deptName', 'parentId');

export const getAllrovince = makeActionCreator(types.getAllrovince);

export const getAllCityByProvinceId = makeActionCreator(types.getAllCityByProvinceId, 'value');

export const getAllCityByProvinceName = makeActionCreator(types.getAllCityByProvinceName, 'value');

export const addUser = makeActionCreator(types.addUser, 'props');

export const addUserSuccess = makeActionCreator(types.addUserSuccess);

