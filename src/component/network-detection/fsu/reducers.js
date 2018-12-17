import assign from 'object-assign';
import * as types from './types';

const defaultState = {
  modelVisiable: false,
  bmapShow: false,
  china: [],
  province: [],
  name: '',

  AlarmInfo: [],
  // 设备编码
  deviceId: '',
  // 是否在线
  statusCode: '',
  // 设备状态
  statusName: '',
  // 是否直播中
  livingFlag: '',
  //
  screen: '',
  screenUrl: '',

  smoke: '',
  // 水浸
  ydn: '',

  // 截图url
  picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544678646022&di=1b1e81d8db2c29e291af3ed79343de1c&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fb999a9014c086e062550d0020f087bf40bd1cbfb.jpg',

  // 直播地址
  liveUrl: '',
  contentShow: false,
  meteTable: [],
};


function addStr(num) {
  const table = {
    0: '黑屏',
    1: '蓝屏',
    2: '花屏',
    3: '卡顿',
    4: '暴恐',
    5: '色情',
  };
  let str = '';
  num.split('').map((v, idx) => {
    if (v == 1) {
      str += `${table[idx]}|`;
    }
  });
  return str.slice(0, -1);
}


function culmete(obj) {
  const meteTable = {
    deviceVoltage: '视频设备电压',
    deviceCurrent: '视频设备电流',
    aboveScreenVoltage: '上屏电压',
    abovescreenCurrent: '上屏电流',
    middleScreenVoltage: '中屏电压',
    middlescreenCurrent: '中屏电流',
    belowScreenVoltage: '下屏电压',
    belowscreenCurrent: '下屏电流',
    eMeterVoltage: '智能电表电压',
    eMeterCurrent: '智能电表电流',
    eMeterPower: '智能电表功率',
  };
  return Object.entries(obj).filter(v => meteTable[v[0]])
    .map(t => ({
      key: meteTable[t[0]],
      value: t[1],
    }));
}


const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.changeValue:
      return assign({}, state, {
        [action.key]: action.value,
      });

    case types.init:
      return assign({}, state, {
        province: [],
      });
    case types.initSuccess:
      return assign({}, state, {
        china: action.data.data.map((v) => {
          const groupId = action.data.ehartsArea.filter(t => t.name === v.name)[0].id;
          return Object.assign({}, v, { groupId });
        }),
      });

    case types.getProviceDataSuccess:
      return assign({}, state, {
        province: action.data.data,
      });


    case types.initContentSuccess:
      const table = {
        0: '正常',
        1: '异常',
      };
      const table1 = {
        0: '未直播',
        1: '直播中',
      };
      return assign({}, state, {
        AlarmInfo: action.data[0].data.alarmDatas,
        deviceId: action.data[0].data.deviceId,
        statusCode: action.data[0].data.statusCode,
        livingFlag: table1[action.data[0].data.livingFlag],
        statusName: action.data[0].data.statusName,
        screen: addStr(action.data[0].data.mete.screen),
        smoke: table[action.data[0].data.mete.smoke],
        ydn: table[action.data[0].data.mete.ydn],
        meteTable: culmete(action.data[0].data.mete),
      });

    case types.liveSuccess:
      return assign({}, state, {
        liveUrl: action.data.data.url,
      });

    case types.getPictureSuccess:
      return assign({}, state, {
        AlarmInfo: state.AlarmInfo.map((v, idx) => Object.assign({}, v, { imgUrl: action.data[idx].data })),
        screenUrl: action.data.slice(-1)[0].data,
      });
    default:
      return state;
  }
};

export default reducer;
