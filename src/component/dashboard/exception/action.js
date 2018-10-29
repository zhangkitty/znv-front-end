import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';


export const changeValue = makeActionCreator(types.changeValue, 'key', 'value');

export const init = makeActionCreator(types.init, 'props');

export const initSuccess = makeActionCreator(types.initSuccess, 'data');

