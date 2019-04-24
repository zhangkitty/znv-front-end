import assign from 'object-assign';
import { getSize } from 'shein-middlewares/pagesize';
import * as types from './types';

export const defaultState = {
  dataSource: [],
  total: 0,
  loading: false,
  formData: {
    pageSize: 10,
    pageNum: 1,
    projectName: '',
  },
  modal: {
    buttonLoading: false,
    visiable: false,
    personList: [],
    chooseUserId: '',
    tempTitle: '',
    date: [],
  },

  create: {
    buttonLoading: false,
  },
  table: {
    selectedRowKeys: [],
  },
};


const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.initSuccess:
      return assign({}, state, {
        total: action.data[0].data.total,
        dataSource: action.data[0].data.list,
        table: assign({}, state.table, {
          selectedRowKeys: action.data[1].data.map(record => `${record.areaCode},${record.itemName},${record.propertyType},${record.quantity}`),
        }),
      });

    case types.search: {
      return assign({}, state, {
        loading: true,
      });
    }

    case types.searchSuccess:
      return assign({}, state, {
        loading: false,
        total: action.data.data.total,
        dataSource: action.data.data.list,
      });

    case types.changePage:
      return assign({}, state, {
        loading: true,
        formData: assign({}, state.formData, {
          pageNum: action.current,
        }),
      });

    case types.changePageSize:
      return assign({}, state, {
        loading: true,
        formData: assign({}, state.formData, {
          pageNum: action.current,
          pageSize: action.size,
        }),
      });

    case types.openModal:
      return assign({}, state, {
        modal: assign({}, state.modal, {
          buttonLoading: true,
        }),
      });

    case types.openModalSuccess:
      return assign({}, state, {
        modal: assign({}, state.modal, {
          buttonLoading: false,
          visiable: true,
          personList: action.data.data.list,
        }),
      });

    case types.closeModal:
      return assign({}, state, {
        modal: assign({}, state.modal, {
          visiable: false,
        }),
      });

    case types.queryTaskDetail:
      return assign({}, state, {
        modal: assign({}, state.modal, {
          chooseUserId: action.v,
        }),
      });

    case types.queryTaskDetailSuccess:
      return assign({}, state, {
        modal: assign({}, state.modal, {
          tempTitle: action.data && action.data.taskName,
        }),
      });

    case types.createTask:
      return assign({}, state, {
        create: assign({}, state.create, {
          buttonLoading: true,
        }),
      });

    case types.createTaskSuccess:
      return assign({}, state, {
        modal: assign({}, state.modal, {
          visiable: false,
        }),
        create: assign({}, state.create, {
          buttonLoading: false,
        }),
      });


    case types.changeTableValue:
      return assign({}, state, {
        table: assign({}, state.table, {
          [action.key]: [...new Set([...action.value])],
        }),
      });


    default:
      return state;
  }
};

export default reducer;
