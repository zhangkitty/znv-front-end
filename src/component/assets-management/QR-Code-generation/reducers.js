import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  number: '',
  dataSource: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.createdeviceSuccess:
      return assign({}, state, {
        dataSource: action.data.data,
      });

    default:
      return state;
  }
};

export default reducer;
