import assign from 'object-assign';
import * as types from './types';

const defaultState = {
  dataSource: [],
  traceList: [],
  taskList: [],
};

const transform = (dataObj) => {
  const table = {
    上班补卡: ['10', '11'],
    下班补卡: ['01', '11'],
  };
  const arr = [];
  const start = {
    operation: '上班卡',
    operationTime: dataObj.startTime,
    operationType: (table['上班补卡']).includes(dataObj.repairCode) ? '补卡' : '正常打卡',
    operationAddress: dataObj.startAddress,
    Latitude: dataObj.startLatitude,
    Longitude: dataObj.startLongitude,
  };
  const end = {
    operation: '下班卡',
    operationTime: dataObj.endTime,
    operationType: (table['下班补卡']).includes(dataObj.repairCode) ? '补卡' : '正常打卡',
    operationAddress: dataObj.endAddress,
    Longitude: dataObj.endLongitude,
    Latitude: dataObj.endLatitude,
  };
  arr.push(start);
  arr.push(end);
  return arr;
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.CHANGE_VALUE:
      return assign({}, state, {
        [action.key]: action.value,
      });

    case types.initSuccess:
      return assign({}, state, {
        dataSource: transform((action.data)[0].data),
        traceList: (action.data)[1].data.traceList,
        taskList: (action.data)[2].data,
      });
    default:
      return state;
  }
};
