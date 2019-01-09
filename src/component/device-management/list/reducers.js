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
  searchLoading: false,
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
    case types.serach:
      return assign({}, state, {
        searchLoading: true,
      });

    case types.serachSuccess:
      return assign({}, state, {
        searchLoading: false,
        dataSource: action.data.data.list,
        total: action.data.data.total,
      });

    case types.changePage:
      return assign({}, state, {
        searchLoading: true,
        formData: assign({}, state.formData, {
          pageNum: action.current,
        }),
      });

    case types.changePageSuccess:
      return assign({}, state, {
        searchLoading: false,
        dataSource: action.data.data.list,
      });


    case types.changePageSize:
      return assign({}, state, {
        searchLoading: true,
        formData: assign({}, state.formData, {
          pageSize: action.size,
          pageNum: action.current,
        }),
      });

    case types.changePageSizeSuccess:
      return assign({}, state, {
        searchLoading: false,
        dataSource: action.data.data.list,
      });
    default:
      return state;
  }
};

export default reducer;
