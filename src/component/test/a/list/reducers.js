import assign from 'object-assign';
import * as types from './types';
import { getSize } from '../../../../middlewares/pagesize';

export const defaultState = {
  ready: true,
  list: [],
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
    default:
      return state;
  }
};

export default reducer;
