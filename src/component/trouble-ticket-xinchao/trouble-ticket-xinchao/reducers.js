import assign from 'object-assign';
import { getSize } from 'shein-middlewares/pagesize';
import * as types from './types';

export const defaultState = {
  ready: true,
  dept: [],
  person: [],
  status: [
    {
      id: 1,
      name: '待分配',
    },
    {
      id: '2,3,4',
      name: '待受理',
    },
    {
      id: '5,65',
      name: '已完成',
    },
  ],
  dataSource: [],
  total: '',
  formData: {
    chooseDept: 11000008,
    date: [],
    projectName: '',
    pageSize: 10,
    pageNum: 1,
  },
  table: {
    loading: false,
  },
  modal: {
    visiable: false,
    deviceId: '',
    projectName: '',
    tenementType: '',
    region: '',
    address: '',
    description: '',
    xc_fault_type: [],
    select_fault_type: '',
  },
};

const trans = arr => arr.map((v) => {
  if (v.children == null) {
    return {
      title: v.name,
      value: v.id,
      key: v.id,
    };
  }
  return {
    title: v.name,
    value: v.id,
    key: v.id,
    children: trans(v.children),
  };
});

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.init:
      return assign({}, state, {
        ready: false,
      });

    case types.initSuccess:
      return assign({}, state, {
        ready: true,
        dept: trans(action.data[0].data),
        person: action.data[1].data.list,
      });


    case types.changeDept:
      return assign({}, state, {
        formData: assign({}, state.formData, {
          chooseDept: action.v,
          choosePerson: '',
        }),
      });

    case types.changeDeptSuccess:
      return assign({}, state, {
        person: action.data.data.list,
      });

    case types.search:
      return assign({}, state, {
        table: assign({}, state.table, {
          loading: true,
        }),
      });

    case types.searchSuccess:
      return assign({}, state, {
        dataSource: action.data.data.list,
        total: action.data.data.total,
        table: assign({}, state.table, {
          loading: false,
        }),
      });

    case types.queryDeviceDetailSuccess:
      return assign({}, state, {
        modal: assign({}, state.modal, {
          projectName: action.data.data.itemName,
          tenementType: action.data.data.propertyType,
          region: action.data.data.region,
          address: action.data.data.address,
        }),
      });

    case types.openModal:
      return assign({}, state, {
        modal: assign({}, state.modal, {
          visiable: true,
        }),
      });

    case types.openModalSuccess:
      return assign({}, state, {
        modal: assign({}, state.modal, {
          xc_fault_type: action.data.data,
        }),
      });

    case types.closeModal:
      return assign({}, state, {
        modal: assign({}, state.modal, {
          visiable: false,
        }),
      });

    case types.createSuccess:
      return assign({}, state, {
        modal: assign({}, state.modal, {
          visiable: false,
          deviceId: '',
          projectName: '',
          tenementType: '',
          region: '',
          address: '',
          description: '',
        }),
      });

    case types.changePage:
      return assign({}, state, {
        formData: assign({}, state.formData, {
          pageNum: action.current,
        }),
      });

    case types.changePageSize:
      return assign({}, state, {
        formData: assign({}, state.formData, {
          pageNum: action.current,
          pageSize: action.size,
        }),
      });
    default:
      return state;
  }
};

export default reducer;
