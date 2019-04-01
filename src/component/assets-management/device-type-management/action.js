import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';

export const init = makeActionCreator(types.init, 'props');
export const initSuccess = makeActionCreator(types.initSuccess, 'data');

export const submit = makeActionCreator(types.submit, 'props');
export const submitSuccess = makeActionCreator(types.submitSuccess, 'data');

export const changeModalValue = makeActionCreator(types.changeModalValue, 'key', 'value');

export const savedevicetype = makeActionCreator(types.savedevicetype, 'props');
export const savedevicetypeSuccess = makeActionCreator(types.savedevicetypeSuccess, 'data');

export const deleteDeviceType = makeActionCreator(types.deleteDeviceType, 'props', 'deviceType');
export const deleteDeviceTypeSuccess = makeActionCreator(types.deleteDeviceTypeSuccess, 'data');
