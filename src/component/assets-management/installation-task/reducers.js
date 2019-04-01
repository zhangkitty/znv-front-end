import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  ready: true,

  project: [],

  formData: {
    // 安装单号
    installNumber: '',
    // 任务生成时间
    taskTime: '',
    // 设备领用人
    devicePerson: '',
    // 设备领用时间
    deviceTime: '',
    // 所属项目
    project: '',
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
        project: action.data.data,
      });


    default:
      return state;
  }
};

export default reducer;
