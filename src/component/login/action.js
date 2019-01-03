import { makeActionCreator } from 'shein-lib/dealFunc';

import * as types from './types';

export const init = makeActionCreator(types.init, 'props');

export const initSuccess = makeActionCreator(types.initSuccess, 'data', 'props');

export const change = makeActionCreator(types.change, 'key', 'value');


export const onHover = makeActionCreator(types.onHover, 'hoveredObject', 'props');
export const onHoverSuccess = makeActionCreator(types.onHoverSuccess, 'data');

