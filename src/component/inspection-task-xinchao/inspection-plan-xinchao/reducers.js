import assign from 'object-assign';
import { getSize } from 'shein-middlewares/pagesize';
import * as types from './types';

export const defaultState = {
  ready: true,
  dept: [],
  person: [],
  title: [],

  formData: {
    chooseDept: 11000008,
    choosePerson: '',
    date: [],
    title: '',
    pageSize: 10000000,
    pageNum: 1,
  },

  table: {
    dataSource: [],
    total: '',
    loading: false,
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
        title: action.data[2].data.map(v => v.taskName),
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
        table: assign({}, state.table, {
          loading: false,
          dataSource: action.data.data.list,
          total: action.data.data.total,
        }),
      });
    default:
      return state;
  }
};

export default reducer;
