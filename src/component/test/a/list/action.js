/**
 * Created by zhanyaqi on 2017/8/2.
 */
import * as types from './types';
import { makeActionCreator } from '../../../../lib/dealFunc';

export const init = (obj) => {
  // 此处处理数据 强化action功能
  obj;
  makeActionCreator(types.init, obj);
};

export const initSet = makeActionCreator(types.initSet, 'data');
export const changeValue = makeActionCreator(types.changeValue, 'key', 'value');
export const search = makeActionCreator(types.search, 'props');
export const searchSet = makeActionCreator(types.searchSet, 'data');
export const handle = makeActionCreator(types.handle, 'types', 'idList');
export const handleSet = makeActionCreator(types.handleSet, 'types');
