import assign from 'object-assign';
import * as types from './types';

const defaultState = {
  modelVisiable: false,
  bmapShow: false,
  // 需要提交的设备ID,
  id: '',
  bmap: {
    center: [120.8556079834, 27.9188764652],
    points: [

    ],
  },
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
  // 定时开机
  openTime: '',
  // 定时关机
  closeTime: '',
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

  temperature: {
    isShow: false,
    key: 2,
    dataSource: [],
  },
  meteId: {
    temperature: 10102001,
    视频设备电压: 10105002,
    视频设备电流: 10104002,
    上屏电压: 10105004,
    上屏电流: 10104004,
    中屏电压: 10105005,
    中屏电流: 10104005,
    下屏电压: 10105006,
    下屏电流: 10104006,
    系统电压: 10105003,
    系统电流: 10104003,
    系统功率: 10109001,
  },
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
  if (str === '') {
    return '正常';
  }
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
    eMeterVoltage: '系统电压',
    eMeterCurrent: '系统电流',
    eMeterPower: '系统功率',
  };
  const meteId = {
    temperature: 10102001,
    视频设备电压: 10105002,
    视频设备电流: 10104002,
    上屏电压: 10105004,
    上屏电流: 10104004,
    中屏电压: 10105005,
    中屏电流: 10104005,
    下屏电压: 10105006,
    下屏电流: 10104006,
    系统电压: 10105003,
    系统电流: 10104003,
    系统功率: 10109001,
  };
  return Object.entries(obj).filter(v => meteTable[v[0]])
    .map(t => ({
      key: meteTable[t[0]],
      value: t[1],
      isShow: false,
      dataSource: [],
      statType: 2,
      meteId: meteId[meteTable[t[0]]],
    }));
}

function changeMetaTable(meteTable, idx) {
  return meteTable.map((v, index) => {
    if (index === idx) {
      return Object.assign({}, v, {
        isShow: !v.isShow,
      });
    }
    return v;
  });
}

function changeMetaTableSuccess(meteTable, idx, data) {
  return meteTable.map((v, index) => {
    if (index === idx) {
      return Object.assign({}, v, {
        dataSource: data,
      });
    }
    return v;
  });
}

function changeStatType(meteTable, statType, idx) {
  return meteTable.map((v, index) => {
    if (index === idx) {
      return Object.assign({}, v, {
        statType,
      });
    }
    return v;
  });
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


    case types.initContent:
      return assign({}, state, {
        id: action.props.id,
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
      const tableSmoke = {
        0: '无烟',
        1: '异常',
      };
      return assign({}, state, {
        AlarmInfo: action.data[0].data.alarmDatas,
        deviceId: action.data[0].data.deviceId,
        statusCode: action.data[0].data.statusCode,
        openTime: action.data[0].data.openTime,
        closeTime: action.data[0].data.closeTime,
        livingFlag: table1[action.data[0].data.livingFlag],
        statusName: action.data[0].data.statusName,
        screen: addStr(action.data[0].data.mete.screen),
        smoke: tableSmoke[action.data[0].data.mete.smoke],
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


    case types.intoMap:
      return assign({}, state, {
        bmap: assign({}, state.bmap, {
          center: [action.value[0], action.value[1]],
          points: [{
            lng: action.value[0],
            lat: action.value[1],
            deviceId: action.value[2],
          }],
        }),
      });

    case types.temperatureTrend:
      return assign({}, state, {
        temperature: assign({}, state.temperature, {
          isShow: !state.temperature.isShow,
        }),
      });

    case types.temperatureTrendSuccess:
      return assign({}, state, {
        temperature: assign({}, state.temperature, {
          dataSource: action.data.data,
        }),
      });

    case types.meteTrend:
      return assign({}, state, {
        meteTable: changeMetaTable(state.meteTable, action.idx),
      });


    case types.meteTrendSuccess:
      return assign({}, state, {
        meteTable: changeMetaTableSuccess(state.meteTable, action.idx, action.data.data),
      });


    case types.changeTempButton:
      return assign({}, state, {
        temperature: assign({}, state.temperature, {
          key: action.props.temperature.key,
        }),
      });

    case types.changeMeteButton:
      return assign({}, state, {
        meteTable: changeStatType(state.meteTable, action.statType, action.idx),
      });

    default:
      return state;
  }
};

export default reducer;
