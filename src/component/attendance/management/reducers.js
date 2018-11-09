import assign from 'object-assign';
import * as types from './types';

const defaultState = {

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
