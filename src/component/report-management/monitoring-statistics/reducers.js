import assign from 'object-assign';
import { getSize } from 'shein-middlewares/pagesize';
import * as types from './types';
import citys from 'utils/city';

import { submitSuccess } from './action';

export const defaultState = {
  ready: false,
  list: [],
  formData: {
    kkk: [],
  },
  secondaryProcess: '',
  produceOrderId: '',
  handleLoading1: '',
  handleLoading2: '',
  dataLoading: false,
  idList: [],
  pageIndex: 1,
  pageSizeOptions: [20, 50, 100].map(value => String(value)),
  perPage: getSize(),
  recordCount: '',
  aims: [],
  choosedAims: null,
  dataDisabled: true,
  city: citys,
  choosedCity: '',
  team: [],
  choosedTeam: null,
  chooseValue: 1, // 城市1-----人员2
  page: 1,
  pageSize: 10,
  total: 0,
  dataSource: [],
  submitChooseValue: 0,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.init:
      return defaultState;

    case types.initSuccess:
      return assign({}, state, {
        ready: true,
        aims: action.data[0].data,
        // city: action.data[1].data,
        // team: action.data[2].data,
      });
    case types.initSet:
      return assign({}, state, action.data, {
        ready: false,
        list: action.data.list,
      });
    case types.search:
      return assign({}, state, {
        dataLoading: true,
      });
    case types.searchSet:
      return assign({}, state, action.data, {
        dataLoading: false,
        list: action.data.list,
      });
    case types.changeValue:
      return assign({}, state, {
        [action.key]: action.value,
      });
    case types.submitSuccess:
      return assign({}, state, {
        total: action.data.total,
        dataSource: action.data.list,
        submitChooseValue: state.chooseValue,
      });
    default:
      return state;
  }
};

export default reducer;
