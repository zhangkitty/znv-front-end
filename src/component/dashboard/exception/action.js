import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';


export const changeValue = makeActionCreator(types.changeValue, 'key', 'value');

export const init = makeActionCreator(types.init, 'props');

export const initSuccess = makeActionCreator(types.initSuccess, 'data');

export const getExceptionRate = makeActionCreator(types.getExceptionRate, 'props');

export const getExceptionRateSuccess = makeActionCreator(types.getExceptionRateSuccess, 'data');


// 明细数据中选择日期
export const changeDetailDay = makeActionCreator(types.changeDetailDay, 'props');
export const changeDetailDaySuccess = makeActionCreator(types.changeDetailDaySuccess, 'data');

// 趋势数据中选择日期(在线率）
export const changeTrendDays = makeActionCreator(types.changeTrendDays, 'props');
export const changeTrendDaysSuccess = makeActionCreator(types.changeTrendDaysSuccess, 'data');


export const getDevicedetail = makeActionCreator(types.getDevicedetail, 'props');
export const getDevicedetailSuccess = makeActionCreator(types.getDevicedetailSuccess, 'data');

// 人员考勤初始化
export const staffAttendanceInit = makeActionCreator(types.staffAttendanceInit, 'props');
export const staffAttendanceInitSuccess = makeActionCreator(types.staffAttendanceInitSuccess, 'data');

// 趋势数据中选择日期(人员考勤)
export const changeTrendDaysInTab1 = makeActionCreator(types.changeTrendDaysInTab1, 'props');
export const changeTrendDaysInTab1Success = makeActionCreator(types.changeTrendDaysInTab1Success, 'data');

export const changeDetailDayTab1 = makeActionCreator(types.changeDetailDayTab1, 'props');
export const changeDetailDayTab1Success = makeActionCreator(types.changeDetailDayTab1Success, 'data');

