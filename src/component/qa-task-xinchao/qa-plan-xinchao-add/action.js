import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';

export const init = makeActionCreator(types.init, 'props');
export const initSuccess = makeActionCreator(types.initSuccess, 'data');

export const search = makeActionCreator(types.search, 'props');
export const searchSuccess = makeActionCreator(types.searchSuccess, 'data');

export const changePage = makeActionCreator(types.changePage, 'props', 'current');
export const changePageSuccess = makeActionCreator(types.changePageSuccess, 'data');

export const changePageSize = makeActionCreator(types.changePageSize, 'props', 'current', 'size');
export const changePageSizeSuccess = makeActionCreator(types.changePageSizeSuccess, 'data');

export const openModal = makeActionCreator(types.openModal, 'props');
export const openModalSuccess = makeActionCreator(types.openModalSuccess, 'data');

export const closeModal = makeActionCreator(types.closeModal, 'props');


export const queryTaskDetail = makeActionCreator(types.queryTaskDetail, 'props', 'v');
export const queryTaskDetailSuccess = makeActionCreator(types.queryTaskDetailSuccess, 'data');

export const createTask = makeActionCreator(types.createTask, 'props');
export const createTaskSuccess = makeActionCreator(types.createTaskSuccess, 'data');
export const createTaskError = makeActionCreator(types.createTaskError,'data');

export const changeTableValue = makeActionCreator(types.changeTableValue, 'key', 'value');

