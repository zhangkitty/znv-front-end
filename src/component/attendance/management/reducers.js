import assign from 'object-assign';
import * as types from './types';

const defaultState = {
  cityList: [],
  personList: [],

};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.CHANGE_VALUE:
      return assign({}, state, {
        [action.key]: action.value,
      });

    case types.initSerSuccess:
      return assign({}, state, {
        cityList: (action.data)[0].data.list,
        personList: (action.data)[1].data.list,
      });

    case types.changeCitySuccess:
      debugger;
      return assign({}, state, {
        personList: action.data.data.list,
      });
    default:
      return state;
  }
};
