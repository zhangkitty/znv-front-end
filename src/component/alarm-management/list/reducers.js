import assign from 'object-assign';
import * as types from './types';
import moment from 'moment';


export const defaultState = {
  ready: true,
  tableLoading: false,
  cityData: [],
  alarmType: [
    { value: '', name: '全部' },
    { value: '0481001001', name: '停电告警' },
    { value: '100', name: '中断告警' },
  ],
  alarmStatus: [
    { value: '', name: '全部' },
    { value: 1, name: '告警中' },
    { value: 2, name: '已消除' },
  ],
  dataSource: [],
  total: '',
  formData: {
    date: [
      moment().subtract(2, 'days'),
      moment().subtract(1, 'days'),
    ],
    city: '',
    alarmType: '',
    name: '',
    Id: '',
    alarmStatus: '',
    pageNum: 1,
    pageSize: 10,
  },
  myModal: {
    buttonLoading: false,
    visiable: false,
    data: [],
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

    case types.serach: {
      return assign({}, state, {
        tableLoading: true,
      });
    }

    case types.serachSuccess:
      return assign({}, state, {
        tableLoading: false,
        dataSource: action.data.data.list.map(v => assign({}, v, {
          buttonLoading: false,
        })),
        total: action.data.data.total,
      });

    case types.changePage: {
      return assign({}, state, {
        formData: assign({}, state.formData, {
          pageNum: action.current,
        }),
      });
    }

    case types.changePageSize:
      return assign({}, state, {
        tableLoading: true,
        formData: assign({}, state.formData, {
          pageSize: action.size,
          pageNum: action.current,
        }),
      });

    case types.getLifeTime:
      return assign({}, state, {
        dataSource: state.dataSource.map((v, idx) => (idx === action.index ? assign({}, v, { buttonLoading: true }) : v)),
        myModal: assign({}, state.myModal, {
        }),
      });

    case types.getLifeTimeSuccess:
      return assign({}, state, {
        dataSource: state.dataSource.map(v => assign({}, v, {
          buttonLoading: false,
        })),
        myModal: assign({}, state.myModal, {
          data: action.data.data.list,
          visiable: true,
        }),
      });


    case types.cancelModal:
      return assign({}, state, {
        myModal: assign({}, state.myModal, {
          visiable: false,
        }),
      });

    default:
      return state;
  }
};

export default reducer;
