import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';


export const init = makeActionCreator(types.init, 'props');
export const initSuccess = makeActionCreator(types.initSuccess, 'data');

export const querylist = makeActionCreator(types.querylist, 'props');
export const querylistSuccess = makeActionCreator(types.querylistSuccess, 'data');
