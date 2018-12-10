import assign from 'object-assign';
import { getSize } from 'shein-middlewares/pagesize';
import * as types from './types';

export const defaultState = {
  data: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.init:
      return defaultState;
    case types.initSuccess:
      return assign({}, state, {
        data: action.data,
      });
    default:
      return state;
  }
};

export default reducer;
