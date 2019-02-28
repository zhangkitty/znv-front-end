import assign from 'object-assign';
import * as types from './types';
import moment from 'moment';
import { changeSelect } from './action';

export const defaultState = {
  type: '51010720564',
  ready: true,
  cityData: [],
  workOrderType: [
    { value: '10', name: '告警' },
    { value: '11', name: '巡检' },
    { value: '12', name: '监播' },
    { value: '13', name: '资产接收' },
    { value: '14', name: '拆机' },
    { value: '15', name: '维修' },
    { value: '16', name: '中断' },
    { value: '17', name: '停电' },
  ],
  workOrderStatus: [

  ],
  deviceType: [
    { value: '10016', name: '被监控设备' },

  ],
  tableLoading: false,
  dataSource: [],
  selectedRowKeys: [],
  total: '',
  formData: {
    city: '',
    workOrderType: '10',
    workOrderStatus: '',
    // 处理人
    name: '',
    deviceType: '10016',
    date: [
      moment().subtract(1, 'days'),
      moment(),
    ],
    pageNum: 1,
    pageSize: 10,
  },

};

const cal = (selectedRowKeys, data) => {
  const map = new Map();

  data.concat(selectedRowKeys).map((v) => {
    if (map.get(v)) {
      map.set(v, map.get(v) + 1);
    } else {
      map.set(v, 1);
    }
  });

  return [...map.keys()];
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.init:
      return assign({}, state, {
        ready: false,
      });
    case types.initSuccess:
      return assign({}, state, {
        cityData: [{ areaCode: '', areaName: '全国' }, ...action.data[0].data.list],
        workOrderStatus: action.data[1].data.list,
        ready: true,
      });

    case types.serach:
      return assign({}, state, {
        tableLoading: true,
      });
    case types.serachSuccess:
      console.log(action.data.data.list);
      return assign({}, state, {
        tableLoading: false,
        dataSource: action.data.data.list,
        total: action.data.data.total,
      });

    case types.changePage:
      return assign({}, state, {
        tableLoading: true,
        formData: assign({}, state.formData, {
          pageNum: action.current,
        }),
      });

    case types.changePageSize:
      return assign({}, state, {
        tableLoading: true,
        formData: assign({}, state.formData, {
          pageNum: action.current,
          pageSize: action.size,
        }),
      });

    case types.changeSelect:
      return assign({}, state, {
        selectedRowKeys: action.data,
      });

    default:
      return state;
  }
};

export default reducer;
