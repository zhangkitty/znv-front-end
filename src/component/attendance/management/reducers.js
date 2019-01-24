import assign from 'object-assign';
import * as types from './types';
import moment from 'moment';
import { newInitSuccess } from './actions';

const defaultState = {
  loading: false,
  cityList: [],

  personList: [],

  dataSource: [],

  attendanceList: [
    { key: '', value: '全部' },
    { key: '1', value: '出勤' },
    { key: '0', value: '未出勤' },
  ],

  formData: {
    cityValue: '',
    date: [
      moment(),
      moment(),
    ],
    personValue: null,
    isAttendance: '',
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

    case types.newInit:
      return assign({}, state, {
        loading: true,
        formData: assign({}, state.formData, {
          cityValue: action.props.params.city === '0' ? '' : action.props.params.city,
          isAttendance: '1',
        }),
      });

    case types.newInitSuccess:
      return assign({}, state, {
        loading: false,
        cityList: [{ areaCode: '', areaName: '全国' }, ...(action.data)[0].data.list],
        personList: (action.data)[1].data.list,
        dataSource: (action.data)[2].data.list,
        formData: assign({}, state.formData, {
          total: (action.data)[2].data.total,
        }),
      });


    case types.changeCity:
      return assign({}, state, {
        formData: assign({}, state.formData, {
          cityValue: action.d,
        }),
      });


    case types.changeCitySuccess:
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

    case types.search:
      return assign({}, state, {
        loading: true,
      });

    case types.searchSuccess:
      return assign({}, state, {
        loading: false,
        dataSource: action.data.data.list,
        formData: assign({}, state.formData, {
          total: action.data.data.total,
        }),
      });

    case types.changePage:
      return assign({}, state, {
        loading: true,
        formData: assign({}, state.formData, {
          page: action.pageValue,
        }),
      });

    case types.changePageSize:
      return assign({}, state, {
        loading: true,
        formData: assign({}, state.formData, {
          pageSize: action.size,
        }),
      });
    default:
      return state;
  }
};
