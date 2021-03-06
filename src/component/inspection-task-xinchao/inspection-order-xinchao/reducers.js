import assign from 'object-assign';
import { getSize } from 'shein-middlewares/pagesize';
import * as types from './types';

export const defaultState = {
  ready: true,
  dept: [],
  person: [],
  title: [],
  table: {
    total: '',
    loading: false,
    dataSource: [],
  },
  status: [
    {
      id: '1,2',
      name: '处理中',
    },
    {
      id: 65,
      name: '已完成',
    },
    {
      id: 67,
      name: '过期未完成',
    },
  ],
  formData: {
    pageNum: 1,
    pageSize: 10,
    chooseDept: 11000008,
    date: [],
    projectName: '',
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
        title: action.data[2].data,
        formData: assign({}, state.formData, {
          chooseTitle: (action.data[2].data).length > 0 ? (action.data[2].data)[0].taskIdList.join(',') : null,
        }),
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

    case types.searchSuccess:
      return assign({}, state, {
        table: assign({}, state.table, {
          total: action.data.data.total,
          dataSource: action.data.data.list,
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
