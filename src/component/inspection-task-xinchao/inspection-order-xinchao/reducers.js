import assign from 'object-assign';
import { getSize } from 'shein-middlewares/pagesize';
import * as types from './types';

export const defaultState = {
  ready: true,
  dept: [],
  person: [],
  title: [],
  total: '',
  dataSource: [],
  status: [
    {
      id: 1,
      name: '待分配',
    },
    {
      id: 2,
      name: '待受理',
    },
    {
      id: 3,
      name: '待处理',
    },
    {
      id: 4,
      name: '处理中',
    },
    {
      id: 65,
      name: '完成关闭',
    },
    {
      id: 67,
      name: '取消关闭',
    },
    {
      id: 68,
      name: '删除',
    },
  ],
  formData: {
    pageNum: 1,
    pageSize: 10,
    chooseDept: 11000008,
    choosePerson: '',
    date: [],
    chooseTitle: '',
    chooseState: '',
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
        dataSource: action.data,
      });
    default:
      return state;
  }
};

export default reducer;
