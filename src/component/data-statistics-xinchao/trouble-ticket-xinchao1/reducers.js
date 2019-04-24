import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  ready: true,
  loading: false,
  selectData: [],
  dataSource: [],
  monthOrWeek: [
    {
      id: '1', name: '周',
    },
    {
      id: '2', name: '月',
    },
  ],

  formData: {
    selectValue: '',
  },
};


const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.init:
      return assign({}, state, {
        ready: false,
        formData: assign({}, state.formData, {
          selectValue: action.props.params.taskId,
        }),
      });

    case types.initSuccess:
      return assign({}, state, {
        ready: true,
        selectData: (action.data)[0].data.list,
        dataSource: (action.data)[1].data.list,
      });


    default:
      return state;
  }
};

export default reducer;
