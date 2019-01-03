import { makeActionCreator } from 'shein-lib/dealFunc';
import * as types from './types';

export const changeValue = makeActionCreator(types.CHANGE_VALUE, 'key', 'value');

export const init = makeActionCreator(types.init, 'props');
export const initSerSuccess = makeActionCreator(types.initSerSuccess, 'data');

export const changeCity = makeActionCreator(types.changeCity, 'props', 'd');
export const changeCitySuccess = makeActionCreator(types.changeCitySuccess, 'data');

export const changePerson = makeActionCreator(types.changePerson, 'props', 'd');
export const changePersonSuccess = makeActionCreator(types.changePersonSuccess, 'data');

export const search = makeActionCreator(types.search, 'props');
export const searchSuccess = makeActionCreator(types.searchSuccess, 'data');

export const changePage = makeActionCreator(types.changePage, 'props', 'pageValue');
export const changePageSuccess = makeActionCreator(types.changePageSuccess, 'data');

export const changePageSize = makeActionCreator(types.changePageSize, 'props', 'size');

