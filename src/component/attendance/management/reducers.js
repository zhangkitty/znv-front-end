import assign from 'object-assign';
import * as types from './types';
import moment from 'moment';

const defaultState = {
  cityList: [],

  personList: [],

  dataSource: [],

  formData: {
    cityValue: '',
    date: [
      new Date(moment().subtract(7, 'days')),
      new Date(moment()),
    ],
    personValue: null,
    page: 1,
    pageSize: 10,
    total: 0,
  },

};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.CHANGE_VALUE:
      return assign({}, state, {
        [action.key]: action.value,
      });

    case types.initSerSuccess:
      return assign({}, state, {
        cityList: [{ areaCode: '', areaName: '全国' }, ...(action.data)[0].data.list],
        personList: (action.data)[1].data.list,
      });

    case types.changeCitySuccess:
      console.log(action.data);
      return assign({}, state, {
        personList: action.data.data.list,
        formData: assign({}, state.formData, {
          personValue: null,
        }),
      });

    case types.changePerson:
      return assign({}, state, {
        formData: assign({}, state.formData, {
          personValue: action.d,
        }),
      });

    case types.searchSuccess:
      return assign({}, state, {
        dataSource: action.data.data.list,
        formData: assign({}, state.formData, {
          total: action.data.data.total,
        }),
      });

    case types.changePage:
      return assign({}, state, {
        formData: assign({}, state.formData, {
          page: action.pageValue,
        }),
      });

    case types.changePageSize:
      return assign({}, state, {
        formData: assign({}, state.formData, {
          pageSize: action.size,
        }),
      });
    default:
      return state;
  }
};
