import assign from 'object-assign';
import { getSize } from 'shein-middlewares/pagesize';
import * as types from './types';

export const defaultState = {
  ready: true,
  dataSource: [],

  modal: {
    visiable: false,
    tempTitle: '',
    chooseItem: '',
    personList: [],
    chooseUser: '',
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
        ready: true,
        dataSource: action.data.data.list,
      });

    case types.openModal:
      return assign({}, state, {
        modal: assign({}, state.modal, {
          tempTitle: action.v.taskName,
          chooseItem: action.v,
        }),
      });
    case types.openModalSuccess:
      return assign({}, state, {
        modal: assign({}, state.modal, {
          visiable: true,
          personList: action.data.data,
        }),
      });

    case types.choseModal:
      return assign({}, state, {
        modal: assign({}, state.modal, {
          visiable: false,
        }),
      });


    default:
      return state;
  }
};

export default reducer;
