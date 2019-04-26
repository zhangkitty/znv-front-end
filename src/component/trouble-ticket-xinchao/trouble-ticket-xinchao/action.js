import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';

export const init = makeActionCreator(types.init, 'props');
export const initSuccess = makeActionCreator(types.initSuccess, 'data');

export const changeDept = makeActionCreator(types.changeDept, 'props', 'v');
export const changeDeptSuccess = makeActionCreator(types.changeDeptSuccess, 'data');

export const search = makeActionCreator(types.search, 'props');
export const searchSuccess = makeActionCreator(types.searchSuccess, 'data');

export const queryDeviceDetail = makeActionCreator(types.queryDeviceDetail, 'props');
export const queryDeviceDetailSuccess = makeActionCreator(types.queryDeviceDetailSuccess, 'data');

export const openModal = makeActionCreator(types.openModal, 'props');
export const openModalSuccess = makeActionCreator(types.openModalSuccess, 'data');

export const closeModal = makeActionCreator(types.closeModal, 'props');

export const create = makeActionCreator(types.create, 'props');
export const createSuccess = makeActionCreator(types.createSuccess, 'data');
