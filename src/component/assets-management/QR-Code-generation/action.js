import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';

export const createdevice = makeActionCreator(types.createdevice, 'props');
export const createdeviceSuccess = makeActionCreator(types.createdeviceSuccess, 'data');
