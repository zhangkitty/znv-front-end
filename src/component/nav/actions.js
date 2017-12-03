import * as types from './types';
import { makeActionCreator } from '../../lib/dealFunc';

export const logout = makeActionCreator(types.LOGOUT);
export const setNavList = makeActionCreator(types.SET_NAV_LIST, 'data');
export const getNavList = makeActionCreator(types.GET_NAV_LIST);
export const expand = makeActionCreator(types.EXPAND, 'value');
export const changeValue = makeActionCreator(types.CHANGE_VALUE, 'key', 'value');
