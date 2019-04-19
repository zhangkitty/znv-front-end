import assign from 'object-assign';
import { getSize } from 'shein-middlewares/pagesize';
import * as types from './types';

export const defaultState = {
  loading: false,
  dataSource: [],
  total: '',

  formData: {
    projectName: '',
    pageNum: 1,
    pageSize: 10,
  },

  table: {
    selectedRowKeys: [],
    selectedRows: [],
  },
};


const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.search:
      return assign({}, state, {
        loading: true,
      });


    case types.searchSuccess:
      return assign({}, state, {
        loading: false,
        total: action.data.data.total,
        dataSource: action.data.data.list,
      });

    case types.changePage:
      return assign({}, state, {
        loading: true,
        formData: assign({}, state.formData, {
          pageNum: action.current,
        }),
      });


    case types.changePageSize:
      return assign({}, state, {
        loading: true,
        formData: assign({}, state.formData, {
          pageNum: action.current,
          pageSize: action.size,
        }),
      });

    case types.changeTableValue:
      return assign({}, state, {
        table: assign({}, state.table, {
          [action.key]: action.value,
        }),
      });


    default:
      return state;
  }
};

export default reducer;
