import assign from 'object-assign';
import * as types from './types';

const defaultState = {
  ready: true,
  loading: true,
  type: '51010720564',
  dataSource: [],
  total: 30,
  formData: {
    pageNum: 1,
    pageSize: 10,
  },
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.init:
      return assign({}, state, {
        ready: false,
      });

    case types.initSuccess:
      return assign({}, state, {
        ready: true,
        loading: true,
        total: action.data.data.total,
        dataSource: action.data.data.list,
      });

    case types.changePage:
      return assign({}, state, {
        loading: false,
        formData: assign({}, state.formData, {
          pageNum: action.props.formData.pageNum,
        }),
      });

    case types.changePageSize:
      return assign({}, state, {
        loading: false,
        formData: assign({}, state.formData, {
          pageNum: action.props.formData.pageNum,
          pageSize: action.props.formData.pageSize,
        }),
      });
    default:
      return state;
  }
};

export default reducer;
