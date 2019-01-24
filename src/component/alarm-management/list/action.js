import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';

export const init = makeActionCreator(types.init, 'props');
export const initSuccess = makeActionCreator(types.initSuccess, 'data');

export const serach = makeActionCreator(types.serach, 'props');
export const serachSuccess = makeActionCreator(types.serachSuccess, 'data');

export const changePage = makeActionCreator(types.changePage, 'props', 'current');
export const changePageSuccess = makeActionCreator(types.changePageSuccess, 'data');

export const changePageSize = makeActionCreator(types.changePageSize, 'props', 'current', 'size');
export const changePageSizeSuccess = makeActionCreator(types.changePageSizeSuccess, 'data');

export const getLifeTime = makeActionCreator(types.getLifeTime, 'taskId', 'index');
export const getLifeTimeSuccess = makeActionCreator(types.getLifeTimeSuccess, 'data');

export const cancelModal = makeActionCreator(types.cancelModal);
