import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';

export const init = makeActionCreator(types.init, 'id');
export const initSuccess = makeActionCreator(types.initSuccess,'data')
