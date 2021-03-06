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
export const getPicture1 = makeActionCreator(types.getPicture1, 'props');


export const getPictureSuccess = makeActionCreator(types.getPictureSuccess, 'data');
export const getPicture1Success = makeActionCreator(types.getPicture1Success, 'data');

export const live = makeActionCreator(types.live, 'props');
export const liveSuccess = makeActionCreator(types.liveSuccess, 'data');

export const intoMap = makeActionCreator(types.intoMap, 'value');


// 查看温度趋势
export const temperatureTrend = makeActionCreator(types.temperatureTrend, 'props');
export const temperatureTrendSuccess = makeActionCreator(types.temperatureTrendSuccess, 'data');
export const changeTempButton = makeActionCreator(types.changeTempButton, 'props');
export const changeTempButtonSuccess = makeActionCreator(types.changeTempButtonSuccess, 'data');


export const meteTrend = makeActionCreator(types.meteTrend, 'props', 'idx');
export const meteTrendSuccess = makeActionCreator(types.meteTrendSuccess, 'data', 'idx');


export const changeMeteButton = makeActionCreator(types.changeMeteButton, 'props', 'statType', 'idx');
