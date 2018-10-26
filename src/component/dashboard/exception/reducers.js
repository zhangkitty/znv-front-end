import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  ready: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.init:
      return defaultState;


    case types.changeValue:
      return assign({}, state, {
        [action.key]: action.value,
      });

    default:
      return state;
  }
};

export default reducer;
