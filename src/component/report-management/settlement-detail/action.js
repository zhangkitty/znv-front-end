import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';

export const changeValue = makeActionCreator(types.changeValue, 'key', 'value');

export const changePage = makeActionCreator(types.changePage, 'props');

export const changePageSize = makeActionCreator(types.changePageSize, 'props');


export const submit = makeActionCreator(types.submit, 'props');
export const submitSuccess = makeActionCreator(types.submitSuccess, 'data');


export const download = makeActionCreator(types.download, 'props');
