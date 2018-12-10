import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  ready: true,
  list: [],
  formData: {
    oneOne: '',
    oneTwo: '',
    oneThree: '',
    oneFour: '',
    oneFive: '',
    oneSix: '',

    twoOne: '',
    twoTwo: '',
    twoThree: '',
    twoFour: '',

  },
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
