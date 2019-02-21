import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';

export const changeValue = makeActionCreator(types.changeValue, 'key', 'value');

export const init = makeActionCreator(types.init, 'props');
export const initSuccess = makeActionCreator(types.initSuccess, 'data');

export const openAddRoleModal = makeActionCreator(types.openAddRoleModal);
export const choseAddRoleModal = makeActionCreator(types.choseAddRoleModal);

export const addRole = makeActionCreator(types.addRole, 'props');
export const addRoleSuccess = makeActionCreator(types.addRoleSuccess, 'data');

export const openModifyRoleModal = makeActionCreator(types.openModifyRoleModal, 'props');
export const openModifyRoleModalSuccess = makeActionCreator(types.openModifyRoleModalSuccess, 'data');

export const closeModifyRoleModal = makeActionCreator(types.closeModifyRoleModal);

export const deleteRole = makeActionCreator(types.deleteRole, 'props');
export const deleteRoleSuccess = makeActionCreator(types.deleteRoleSuccess, 'data');

export const getRoleDetail = makeActionCreator(types.getRoleDetail, 'id');
export const getRoleDetailSuccess = makeActionCreator(types.getRoleDetailSuccess, 'data');

export const submit = makeActionCreator(types.submit, 'props');
export const submitSuccess = makeActionCreator(types.submitSuccess, 'data');

export const getCompanyDetail = makeActionCreator(types.getCompanyDetail);

export const modifyRole = makeActionCreator(types.modifyRole, 'props');
export const modifyRoleSuccess = makeActionCreator(types.modifyRoleSuccess, 'data');

