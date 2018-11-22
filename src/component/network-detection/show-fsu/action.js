import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';


export const changeValue = makeActionCreator(types.changeValue, 'key', 'value');

export const init = makeActionCreator(types.init, 'props');
export const initSuccess = makeActionCreator(types.initSuccess, 'data');

export const search = makeActionCreator(types.search, 'props');
export const searchSuccess = makeActionCreator(types.searchSuccess, 'data');

export const changePage = makeActionCreator(types.changePage, 'props');
export const changePageSize = makeActionCreator(types.changePageSize, 'props');

