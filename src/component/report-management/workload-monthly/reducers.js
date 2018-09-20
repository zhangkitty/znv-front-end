import assign from 'object-assign';
import { getSize } from 'shein-middlewares/pagesize';
import gen from 'utils/gen-month';
import citys from 'utils/city';
import * as types from './types';

export const defaultState = {
  ready: false,
  list: [],
  formData: {
    kkk: '',
    choosedMonth: null,
    choosedCity: null,
    choosedTeam: null,
    chooseValue: 1, // 城市1------人员2
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
  month: gen(),
  city: citys,
  team: [],
  page: 1,
  pageSize: 10,
  total: 0,
  dataSource: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.init:
      return defaultState;

    case types.initSuccess:
      return assign({}, state, {
        ready: true,
        // month: action.data[0].data,
        // city: action.data[1].data,
        team: action.data[2].data,
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
      });
    default:
      return state;
  }
};

export default reducer;
