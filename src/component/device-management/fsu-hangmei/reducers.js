import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  ready: true,
  cityData: [],
  receiveData: [
    { value: '', name: '全部' },
    { value: 1, name: '已接收' },
    { value: 0, name: '未接收' },
  ],
  onlineData: [
    { value: '', name: '全部' },
    { value: 1, name: '在线' },
    { value: 0, name: '离线' },
  ],
  dataSource: [],
  total: '',
  formData: {
    city: '',
    name: '',
    Id: '',
    receiveState: '',
    onlineState: '',
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
        cityData: [{ areaCode: '', areaName: '全国' }, ...action.data.data.list],
        ready: true,
      });
    default:
      return state;
  }
};

export default reducer;
