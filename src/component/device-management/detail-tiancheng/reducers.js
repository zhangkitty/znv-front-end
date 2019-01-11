import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  ready: true,
  type: '天呈',
  initData: {},
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.init:
      return assign({}, state, {
        ready: false,
      });
    case types.initSuccess:
      return assign({}, state, {
        ready: true,
        initData: action.data.data,
      });
    default:
      return state;
  }
};

export default reducer;
