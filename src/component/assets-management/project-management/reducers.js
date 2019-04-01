import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  ready: true,
  loading: true,
  project: [],
  company: [],


  dataSource: [],
  formData: {
    pageSize: 10,
    pageNum: 1,
    total: '',

  },

  addModal: {
    visiable: false,
    addOrEdit: 'add',
    projectCode: '',
    projectName: '',
    company: '',
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
        project: (action.data)[0].data,
        company: (action.data)[1].data,
      });


    case types.submit:
      return assign({}, state, {
        loading: false,
      });

    case types.submitSuccess:
      return assign({}, state, {
        loading: true,
        dataSource: action.data.data.list,
        formData: assign({}, state.formData, {
          total: action.data.data.total,
        }),
      });

    case types.changeModalValue:
      return assign({}, state, {
        addModal: assign({}, state.addModal, {
          [action.key]: action.value,
        }),
      });


    case types.savedevicetypeSuccess:
      return assign({}, state, {
        addModal: assign({}, state.addModal, {
          visiable: false,
        }),
      });
    default:
      return state;
  }
};

export default reducer;
