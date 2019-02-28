import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  pageReady: true,
  tableReady: true,
  area: [],
  status: [
    { value: 1, name: '在线' },
    { value: 2, name: '离线' },
    { value: 3, name: '未配置' },
    { value: 5, name: '在线已配置' },
    { value: 6, name: '离线已配置' },
  ],
  type: [
    { value: '1', name: 'EISU_EISUP' },
    { value: '2', name: 'EISUA' },
    { value: '3', name: 'EISU_EISUP3' },
    { value: '4', name: 'SISU_EISUP' },
    { value: '5', name: 'SISU_EISUP3' },
    { value: '7', name: 'CFMU' },
    { value: '9', name: 'IG2000' },
    { value: '11', name: 'SISUA' },
    { value: '12', name: 'IG1000' },
    { value: '13', name: 'IG1000V2' },
    { value: '14', name: 'IG3000' },
    { value: '15', name: 'IG100' },
    { value: '16', name: 'IG110 - S' },
    { value: '17', name: 'IG100 - WS' },
    { value: '20', name: 'IG2000V3' },
  ],
  formData: {
    choosedArea: {},
    监控单元Num: '',
    监控单元ID: '',
    siteName: '',
    status: '',
    type: '',
  },
  dataSource: [],
  page: 1,
  pageSize: 10,
  total: 0,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.changeValue:
      return assign({}, state, {
        [action.key]: action.value,
      });
    case types.init:
      return assign({}, state, {
        pageReady: false,
      });
    case types.initSuccess:
      return assign({}, state, {
        pageReady: true,
        area: action.data.data,
        formData: assign({}, state.formData, {
          choosedArea: action.data.data[action.data.data.length - 1],
        }),
      });
    case types.search:
      return assign({}, state, {
        tableReady: false,
      });
    case types.searchSuccess:
      return assign({}, state, {
        tableReady: true,
        dataSource: action.data.data.map(v => v.reduce((sum, cur, idx) => { sum[idx] = cur; return sum; }, {})),
        total: action.data.iTotalRecords,
      });
    case types.changePage:
      return assign({}, state, {
        tableReady: false,
      });
    case types.changePageSize:
      return assign({}, state, {
        tableReady: false,
      });
    default:
      return state;
  }
};

export default reducer;
