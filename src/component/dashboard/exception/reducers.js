import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  ready: false,
  cityTree: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.init:
      return defaultState;
    case types.changeValue:
      return assign({}, state, {
        [action.key]: action.value,
      });
    case types.initSuccess:
      return assign({}, state, {
        cityTree: (action.data)[0].data,
      });
    default:
      return state;
  }
};

export default reducer;
