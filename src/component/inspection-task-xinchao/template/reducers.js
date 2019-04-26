import assign from 'object-assign';
import { getSize } from 'shein-middlewares/pagesize';
import * as types from './types';

export const defaultState = {
  ready: true,
  dataSource: [],
  total: '',

  modal: {
    visiable: false,
    tempTitle: '',
    chooseItem: '',
    personList: [],
    chooseUser: '',
  },
  formData: {
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
        ready: true,
        dataSource: action.data.data.list,
        total: action.data.data.total,
      });

    case types.changePage:
      return assign({}, state, {
        ready: false,
        formData: assign({}, state.formData, {
          pageNum: action.current,
        }),
      });

    case types.changePageSize:
      return assign({}, state, {
        ready: false,
        formData: assign({}, state.formData, {
          pageNum: action.current,
          pageSize: action.size,
        }),
      });


    case types.openModal:
      return assign({}, state, {
        modal: assign({}, state.modal, {
          // tempTitle: action.v.taskName,
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

    case types.updateSuccess:
      return assign({}, state, {
        visiable: false,
      });

    case types.changeInspectPerson:
      return assign({}, state, {
        modal: assign({}, state.modal, {
          chooseUser: action.v,
        }),
      });

    case types.changeInspectPersonSuccess:
      return assign({}, state, {
        modal: assign({}, state.modal, {
          tempTitle: action.data.data.total === 1 ?
            action.data.data.list[0].taskName
            :
            state.modal.personList.filter(v => v.userId === state.modal.chooseUser).map(t => `${t.fullName}(${t.empNo})`)[0],
        }),
      });


    default:
      return state;
  }
};

export default reducer;
