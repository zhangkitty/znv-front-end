import assign from 'object-assign';
import { getSize } from 'shein-middlewares/pagesize';
import * as types from './types';

export const defaultState = {
  left: {
    tree: null,
  },
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.initSuccess:
      debugger;
      return assign({}, state, {
        left: assign({}, state.left, {
          tree: action.data.data,
        }),
      });
    default:
      return state;
  }
};

export default reducer;
