import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';

export const init = makeActionCreator(types.init, 'props');
export const initSuccess = makeActionCreator(types.initSuccess, 'data');

export const changeFour = makeActionCreator(types.changeFour, 'd');
export const changeFourSuccess = makeActionCreator(types.changeFourSuccess, 'data');

export const changeProvince = makeActionCreator(types.changeProvince, 'd');
export const changeProviceSuccess = makeActionCreator(types.changeProvinceSuccess, 'data');

export const changeCity = makeActionCreator(types.changeCity, 'd');
export const changeCitySuccess = makeActionCreator(types.changeCitySuccess, 'data');

export const changeTwoFive = makeActionCreator(types.changeTwoFive, 'd');

export const search = makeActionCreator(types.search, 'props');
export const searchSuccess = makeActionCreator(types.searchSuccess, 'data');

// 导出
export const out = makeActionCreator(types.out, 'props');
export const outSuccess = makeActionCreator(types.outSuccess, 'data');

// 关闭modal
export const closeModal = makeActionCreator(types.closeModal);
// 打开modal
export const openModal = makeActionCreator(types.openModal, 'd');
