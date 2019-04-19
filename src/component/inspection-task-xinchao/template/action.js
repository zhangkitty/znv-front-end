import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';

export const init = makeActionCreator(types.init, 'props');
export const initSuccess = makeActionCreator(types.initSuccess, 'data');


export const openModal = makeActionCreator(types.openModal, 'props', 'taskName');
export const openModalSuccess = makeActionCreator(types.openModalSuccess, 'data');

export const choseModal = makeActionCreator(types.choseModal, 'props');
