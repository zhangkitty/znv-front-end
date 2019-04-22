import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';

export const init = makeActionCreator(types.init, 'props');
export const initSuccess = makeActionCreator(types.initSuccess, 'data');

export const changeDept = makeActionCreator(types.changeDept, 'props', 'v');
export const changeDeptSuccess = makeActionCreator(types.changeDeptSuccess, 'data');

export const search = makeActionCreator(types.search,'props');
export const searchSuccess = makeActionCreator(types.searchSuccess,'data');
