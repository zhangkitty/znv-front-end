import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  ready: false,
  cityTree: [],
  clickedId: '0',
  onlineRate: {
    headTable: {

    },
    trend: {
      imensiond: [
        { value: 0, name: '按天' },
        { value: 1, name: '按周' },
        { value: 2, name: '按月' },
        { value: 3, name: '按季' },
      ],
      showType: [
        { value: 0, name: '折线图' },
        { value: 1, name: '表格' },
      ],
    },
    detailData: {
      imensiond: [
        { value: 0, name: '按天' },
        { value: 1, name: '按周' },
        { value: 2, name: '按月' },
        { value: 3, name: '按季' },
      ],
      showType: [
        { value: 0, name: '柱状图' },
        { value: 1, name: '表格' },
      ],
    },
  },
  staffAttendance: {
    headTable: {

    },
    trend: {
      imensiond: [
        { value: 0, name: '按天' },
        { value: 1, name: '按周' },
        { value: 2, name: '按月' },
        { value: 3, name: '按季' },
      ],
      showType: [
        { value: 0, name: '折线图' },
        { value: 1, name: '表格' },
      ],
    },
    detailData: {
      imensiond: [
        { value: 0, name: '按天' },
        { value: 1, name: '按周' },
        { value: 2, name: '按月' },
        { value: 3, name: '按季' },
      ],
      showType: [
        { value: 0, name: '柱状图' },
        { value: 1, name: '表格' },
      ],
    },
  },
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.init:
      return defaultState;
    case types.changeValue:
      return assign({}, state, {
        [action.key]: action.value,
      });
    case types.initSuccess:
      return assign({}, state, {
        cityTree: (action.data)[0].data,
        ready: true,
      });
    default:
      return state;
  }
};

export default reducer;
