import { makeActionCreator } from 'shein-lib/dealFunc';
import * as types from './types';

export const changeValue = makeActionCreator(types.CHANGE_VALUE, 'key', 'value');

export const init = makeActionCreator(types.init, 'id', 'dateTime');
export const initSuccess = makeActionCreator(types.initSuccess, 'data');
