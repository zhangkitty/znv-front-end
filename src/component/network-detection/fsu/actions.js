import { makeActionCreator } from 'shein-lib/dealFunc';
import * as types from './types';

export const changeValue = makeActionCreator(types.changeValue, 'key', 'value');


export const init = makeActionCreator(types.init, 'props');
export const initSuccess = makeActionCreator(types.initSuccess, 'data');

export const getProviceData = makeActionCreator(types.getProviceData, 'props');
export const getProviceDataSuccess = makeActionCreator(types.getProviceDataSuccess, 'data');

export const initContent = makeActionCreator(types.initContent, 'props');
export const initContentSuccess = makeActionCreator(types.initContentSuccess, 'data');

export const getPicture = makeActionCreator(types.getPicture, 'props');


export const getPictureSuccess = makeActionCreator(types.getPictureSuccess, 'data');

export const live = makeActionCreator(types.live, 'props');
export const liveSuccess = makeActionCreator(types.liveSuccess, 'data');
