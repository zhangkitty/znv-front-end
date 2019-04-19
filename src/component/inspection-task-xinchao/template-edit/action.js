import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';


export const search = makeActionCreator(types.search, 'props');
export const searchSuccess = makeActionCreator(types.searchSuccess, 'data');


export const changePage = makeActionCreator(types.changePage, 'props', 'current');
export const changePageSuccess = makeActionCreator(types.changePageSuccess, 'data');

export const changePageSize = makeActionCreator(types.changePageSize, 'props', 'current', 'size');
export const changePageSizeSuccess = makeActionCreator(types.changePageSizeSuccess, 'data');

export const changeTableValue = makeActionCreator(types.changeTableValue, 'key', 'value');

