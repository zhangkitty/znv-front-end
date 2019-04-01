import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  dataSource: [],
  total: '',
  devicestatusList: [],
  devicegradeList: [],
  formData: {
    deviceStatus: '',
    deviceCode: '',
    person: '',
    devicegrade: '',
    pageSize: 10,
    pageNum: 1,
  },
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.initSuccess:
      return assign({}, state, {
        devicestatusList: (action.data)[0].data,
        devicegradeList: (action.data)[1].data,
      });


    case types.querylistSuccess:
      return assign({}, state, {
        dataSource: action.data.data.list,
        total: action.data.data.total,
      });

    default:
      return state;
  }
};

export default reducer;
