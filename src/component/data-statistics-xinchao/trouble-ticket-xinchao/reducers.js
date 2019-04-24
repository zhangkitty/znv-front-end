import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  ready: true,
  loading: false,
  selectData: [],
  dataSource: [],
  formData: {
    selectValue: '',
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
        selectData: action.data.data.list,
        formData: assign({}, state.formData, {
          selectValue: action.props.params.taskId || action.data.data.list[0].taskId,
        }),
      });

    case types.search:
      return assign({}, state, {
        loading: true,

      });

    case types.searchSuccess:
      return assign({}, state, {
        loading: false,
        dataSource: action.data.data.list,
      });


    default:
      return state;
  }
};

export default reducer;
