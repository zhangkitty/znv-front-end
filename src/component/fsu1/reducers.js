import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  admintoken: '',
  message: '',
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.CHANGE_VALUE:
      return assign({}, state, {
        [action.key]: action.value,
      });
    default:
      return state;
  }
};

export default reducer;
