import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';

export const init = makeActionCreator(types.init, 'props');

export const initSuccess = makeActionCreator(types.initSuccess, 'data');

export const change = makeActionCreator(types.change,'key','value');


