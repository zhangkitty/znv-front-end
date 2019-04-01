import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  dataSource: [],
  total: '',
  companyList: [],
  formData: {
    company: '',
    date: '',
    pageSize: 10,
    pageNum: 1,
  },
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.initSuccess:
      return assign({}, state, {
        companyList: action.data.data,
      });


    case types.queryrecordlistSuccess:
      return assign({}, state, {
        dataSource: action.data.data.list,
        total: action.data.data.total,
      });

    default:
      return state;
  }
};

export default reducer;
