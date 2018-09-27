import assign from 'object-assign';
import { getSize } from 'shein-middlewares/pagesize';
import * as types from './types';

export const defaultState = {
  ready: true,
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
  chooseValue: 1, // 城市1------人员2
  pageSize: 10,
  page: 1,
  total: 0,
  dataSource: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.init:
      return defaultState;
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
