import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';

export const init = makeActionCreator(types.init, 'props');
export const initSuccess = makeActionCreator(types.initSuccess, 'data');


export const openModal = makeActionCreator(types.openModal, 'props', 'v');
export const openModalSuccess = makeActionCreator(types.openModalSuccess, 'data');

export const choseModal = makeActionCreator(types.choseModal, 'props');

export const update = makeActionCreator(types.update, 'props');
export const updateSuccess = makeActionCreator(types.updateSuccess, 'data');

export const changePage = makeActionCreator(types.changePage, 'props', 'current');
export const changePageSuccess = makeActionCreator(types.changePageSuccess, 'data');

export const changePageSize = makeActionCreator(types.changePageSize, 'props', 'current', 'size');
export const changePageSizeSuccess = makeActionCreator(types.changePageSizeSuccess, 'data');
