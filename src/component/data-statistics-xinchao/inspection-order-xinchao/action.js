import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';

export const init = makeActionCreator(types.init, 'props');
export const initSuccess = makeActionCreator(types.initSuccess, 'data', 'props');

export const search = makeActionCreator(types.search, 'props');
export const searchSuccess = makeActionCreator(types.searchSuccess, 'data');

export const exportExcel = makeActionCreator(types.exportExcel,'props');
