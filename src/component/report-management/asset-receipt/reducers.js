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
  city: citys, // 考核城市
  choosedCity: null,
  team: [], // 考核团队
  choosedTeam: null,
  month: gen(), // 统计月份
  choosedMonth: null,
  chooseValue: 1, // 城市1---人员2
  page: 1,
  pageSize: 10,
  total: 0,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.init:
      return defaultState;

    case types.initSuccess:
      return assign({}, state, action.data, {
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
      return assign({}, state);
    default:
      return state;
  }
};

export default reducer;
