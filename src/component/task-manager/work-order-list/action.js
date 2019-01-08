import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';

export const init = makeActionCreator(types.init, 'props');
export const initSuccess = makeActionCreator(types.initSuccess, 'data');

export const serach = makeActionCreator(types.serach, 'props');
export const serachSuccess = makeActionCreator(types.serachSuccess, 'data');
