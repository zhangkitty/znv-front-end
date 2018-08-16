import { makeActionCreator } from 'shein-lib/dealFunc';
import * as types from './types';

export const changeValue = makeActionCreator(types.CHANGE_VALUE, 'key', 'value');
export const commitLogin = makeActionCreator(types.LOGIN, 'data', 'from');

export const submit = makeActionCreator(types.SUBMIT, 'data');
