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

export const changeDetailTypeTab1 = makeActionCreator(types.changeDetailTypeTab1, 'props');
export const changeDetailTypeTab1Success = makeActionCreator(types.changeDetailTypeTab1Success, 'data');

// 改变城市地图的中心
export const changeCityCenter = makeActionCreator(types.changeCityCenter, 'data');

export const changeMarker = makeActionCreator(types.changeMarker, 'data');

// 打开Modal(全国级别）
export const openWorkRateInc = makeActionCreator(types.openWorkRateInc, 'props');
export const openWorkRateIncSuccess = makeActionCreator(types.openWorkRateIncSuccess, 'data');
export const closeWorkRateInc = makeActionCreator(types.closeWorkRateInc);
// 打开Modal(全国级别）
export const openWorkTimeInc = makeActionCreator(types.openWorkTimeInc, 'props');
export const openWorkTimeIncSuccess = makeActionCreator(types.openWorkTimeIncSuccess, 'data');
export const closeWorkTimeInc = makeActionCreator(types.closeWorkTimeInc);

export const openCityWorkRateInc = makeActionCreator(types.openCityWorkRateInc, 'props');
export const openCityWorkRateIncSuccess = makeActionCreator(types.openCityWorkRateIncSuccess, 'data');
export const closeCityWorkRateInc = makeActionCreator(types.closeCityWorkRateInc);

export const openCityWorkTimeInc = makeActionCreator(types.openCityWorkTimeInc, 'props');
export const openCityWorkTimeIncSuccess = makeActionCreator(types.openCityWorkTimeIncSuccess, 'data');
export const closeCityWorkTimeInc = makeActionCreator(types.closeCityWorkTimeInc);

