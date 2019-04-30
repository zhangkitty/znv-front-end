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
  },
  errorModal: {
    dataSource: [],
    visiable: false,
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
        total: action.data[0].data.total,
        dataSource: action.data[0].data.list,
        table: assign({}, state.table, {
          selectedRowKeys: action.data[1].data.map(record => (`${record.areaCode},${record.itemName},${record.propertyType},${record.quantity}`)),
        }),
      });

    case types.changePage:
      return assign({}, state, {
        loading: true,
        formData: assign({}, state.formData, {
          pageNum: action.current,
        }),
        dataSource: [],
      });

    case types.changePageSuccess:
      return assign({}, state, {
        loading: false,
        total: action.data.data.total,
        dataSource: action.data.data.list,
      });


    case types.changePageSize:
      return assign({}, state, {
        loading: true,
        formData: assign({}, state.formData, {
          pageNum: action.current,
          pageSize: action.size,
        }),
        dataSource: [],
      });

    case types.changePageSizeSuccess:
      return assign({}, state, {
        loading: false,
        total: action.data.data.total,
        dataSource: action.data.data.list,
      });

    case types.changeTableValue:
      return assign({}, state, {
        table: assign({}, state.table, {
          [action.key]: action.value,
        }),
      });

    case types.changeErrorModal:
      return assign({}, state, {
        errorModal: assign({}, state.errorModal, {
          [action.key]: action.value,
        }),
      });

    case types.openErrorModal:
      return assign({}, state, {
        errorModal: assign({}, state.errorModal, {
          dataSource: action.data.data,
          visiable: true,
        }),
      });


    default:
      return state;
  }
};

export default reducer;
