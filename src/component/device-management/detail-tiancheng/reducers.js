import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  ready: true,
  type: '天呈',
  initData: {},
  historyData: [],
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
        initData: action.data.data.list[0],
        historyData: action.data.data.list.slice(1),
      });
    default:
      return state;
  }
};

export default reducer;
