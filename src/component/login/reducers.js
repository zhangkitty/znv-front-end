/**
 * Created by yeyangmei on 2017/5/15.
 */

import assign from 'object-assign';
import * as types from './types';

const defaultState = {
  admintoken: '',
  message: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.CHANGE_VALUE:
      return assign({}, state, {
        [action.key]: action.value,
      });
    default:
      return state;
  }
};
