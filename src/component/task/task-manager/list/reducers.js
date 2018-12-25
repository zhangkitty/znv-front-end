import assign from 'object-assign';
import * as types from './types';

const defaultState = {
  ready: true,
  areaList: [],
  deviceTypeList: [],
  oneThree: [],
  oneSix: [],
  twoOne: [],
  twoThree: [],
  twoFour: [],
  dataSource: [],
  formData: {
    oneOne: '',
    oneTwo: '',
    oneThree: '',
    oneFour: '',
    oneFive: '',
    oneSix: '',

    twoOne: '',
    twoTwo: null,
    twoThree: '',
    twoFour: '',
    twoFive: [],

    pageNum: 1,
    pageSize: 10,

    total: 0,

  },

  modal: {
    visible: false,
    dataSource: [],
  },

  steps: [

  ],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.changeValue:
      return assign({}, state, {
        [action.key]: action.value,
      });
    case types.init:
      return defaultState;
    case types.initSuccess:
      return assign({}, state, {
        areaList: action.data[0].data,
        deviceTypeList: action.data[1],
        oneThree: action.data[2].dispatchTypes,
        oneSix: action.data[2].prioritys,
        twoOne: action.data[2].states,
      });

    case types.changeFour:
      return assign({}, state, {
        formData: assign({}, state.formData, {
          oneFour: action.d,
        }),
      });

    case types.changeFourSuccess:
      return assign({}, state, {
        oneFive: action.data,
      });

    case types.changeProvinceSuccess:
      return assign({}, state, {
        twoThree: action.data.data,
      });

    case types.changeCitySuccess:
      return assign({}, state, {
        twoFour: action.data.data,
      });

    case types.changeTwoFive:
      return assign({}, state, {
        formData: assign({}, state.formData, {
          twoFive: action.d,
        }),
      });
    case types.searchSuccess:
      debugger;
      return assign({}, state, {
        dataSource: action.data.data.list,
        formData: assign({}, state.formData, {
          total: action.data.data.total,
        }),
      });

    case types.openModal:
      return assign({}, state, {
        modal: assign({}, state.modal, {
          visible: true,
        }),
      });

    case types.closeModal:
      return assign({}, state, {
        modal: assign({}, state.modal, {
          visible: false,
        }),
      });

    case types.openModalSuccess:
      return assign({}, state, {
        modal: assign({}, state.modal, {
          dataSource: action.data,
        }),
      });

    case types.changePage:
      return assign({}, state, {
        formData: assign({}, state.formData, {
          pageNum: action.props.formData.pageNum,
        }),
      });

    case types.changePageSize:
      return assign({}, state, {
        formData: assign({}, state.formData, {
          pageSize: action.props.formData.pageSize,
        }),
      });


    default:
      return state;
  }
};

export default reducer;
