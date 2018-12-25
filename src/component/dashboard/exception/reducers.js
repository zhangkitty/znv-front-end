import assign from 'object-assign';
import moment from 'moment';
import * as types from './types';

export const defaultState = {
  ready: false,
  cityTree: [],
  clickedId: '0',
  node: null,

  TabValue: 0,

  onlineRate: {
    headTable: {
      dataSource: [],
    },
    trend: {
      dateValue: [
        moment().subtract(30, 'days').toDate(),
        moment().toDate(),
      ],
      imensiond: [
        { value: 0, name: '按天', disabled: false },
        // { value: 1, name: '按周', disabled: true },
        { value: 2, name: '按月', disabled: true },
        { value: 3, name: '按季', disabled: true },
      ],
      choosedImensiond: 0,
      dataSource: [],
      showType: [
        { value: 0, name: '折线图' },
        { value: 1, name: '表格' },
      ],
      choosedShowType: 0,
    },
    detailData: {
      imensiond: [
        { value: 0, name: '按天', disabled: false },
        // { value: 1, name: '按周', disabled: true },
        { value: 2, name: '按月', disabled: true },
        { value: 3, name: '按季', disabled: true },
      ],
      choosedImensiond: 0,
      choosedData: moment().format('YYYY-MM-DD'),
      showType: [
        { value: 0, name: '柱状图' },
        { value: 1, name: '表格' },
      ],
      choosedShowType: 0,
      dataSource: [],
    },
    deviceTable: {
      imensiond: [
        { value: 0, name: '按天', disabled: false },
        // { value: 1, name: '按周', disabled: true },
        { value: 2, name: '按月', disabled: true },
        { value: 3, name: '按季', disabled: true },
      ],
      choosedImensiond: 0,
      dataSource: [],
      choosedData: moment().format('YYYY-MM-DD'),
      showType: [
        { value: 1, name: '离线时间超长' },
        { value: 2, name: '频繁离线' },
        { value: 3, name: '稳定在线' },
        { value: 4, name: '云运维离线设备' },
      ],
      chooseType: 1,
    },
  },
  staffAttendance: {
    ready: true,
    headTable: {
      dataSource: [],
    },
    trend: {
      imensiond: [
        { value: 0, name: '按天', disabled: false },
        // { value: 1, name: '按周', disabled: true },
        { value: 2, name: '按月', disabled: true },
        { value: 3, name: '按季', disabled: true },
      ],
      dateValue: [
        moment().subtract(30, 'days').format('YYYY-MM-DD'),
        moment().subtract(1, 'days').format('YYYY-MM-DD'),
      ],
      choosedImensiond: 0,
      dataSource: [],
      showType: [

      ],
    },
    detailData: {
      imensiond: [
        { value: 0, name: '按天', disabled: false },
        // { value: 1, name: '按周', disabled: true },
        { value: 2, name: '按月', disabled: true },
        { value: 3, name: '按季', disabled: true },
      ],
      choosedImensiond: 0,
      choosedData: moment().format('YYYY-MM-DD'),
      showType: [
        { value: 1, name: '地图' },
        { value: 2, name: '柱状图' },
      ],
      chooseType: 1,
      dataSource: [],
      dataSourcePerson: [], // 人员轨迹
      dataSourceTask: [], // 任务轨迹查询
      cityCenter: [],
      marker: null,
    },
  },
};

const transfrom = data => data.map(v => assign({}, v, {
  id: `${v.level}.${v.areaCode}`,
  children: (function (a) {
    if (a.userInfo === undefined) {
      return null;
    }
    if (a.userInfo === undefined || a.userInfo === '') {
      return transfrom(a.cityList);
    }
    a.userInfo.split(',').map(t => a.cityList.push({
      areaCode: t.split(':')[0],
      areaName: t.split(':')[1],
      cityList: [],
      level: `${a.level}.${a.areaCode}`,
      person: true,
      lat: a.lat,
      lng: a.lng,
    }));
    if (a.cityList.length > 0) {
      return transfrom(a.cityList);
    }
    return null;
  }(v)),
}));

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
        cityTree: [{
          areaName: '全国',
          id: '0',
          children: transfrom((action.data)[0].data),
        }],
        node: {
          areaName: '全国',
          id: '0',
        },
        onlineRate: assign({}, state.onlineRate, {
          headTable: assign({}, state.onlineRate.headTable, {
            dataSource: action.data[1].data.list,
          }),
          trend: assign({}, state.onlineRate.trend, {
            dataSource: action.data[2].data.list,
          }),
          detailData: assign({}, state.onlineRate.detailData, {
            dataSource: action.data[3].data.list,
          }),
        }),
        ready: true,
      });

    case types.getExceptionRateSuccess:
      return assign({}, state, {
        onlineRate: assign({}, state.onlineRate, {
          headTable: assign({}, state.onlineRate.headTable, {
            dataSource: action.data[0].data.list,
          }),
          trend: assign({}, state.onlineRate.trend, {
            dataSource: action.data[1].data.list,
          }),
          detailData: assign({}, state.onlineRate.detailData, {
            dataSource: action.data[2].data.list,
          }),
          deviceTable: assign({}, state.onlineRate.deviceTable, {
            dataSource: action.data[3] && action.data[3].data.list,
          }),
        }),
      });

    case types.changeDetailDay:
      return assign({}, state, {
        onlineRate: assign({}, state.onlineRate, {
          detailData: assign({}, state.onlineRate.detailData, {
            choosedData: action.props.onlineRate.detailData.choosedData,
          }),
        }),
      });


    case types.changeDetailDaySuccess:
      return assign({}, state, {
        onlineRate: assign({}, state.onlineRate, {
          detailData: assign({}, state.onlineRate.detailData, {
            dataSource: action.data.data.list,
          }),
        }),
      });

    case types.changeTrendDays:
      return assign({}, state, {
        onlineRate: assign({}, state.onlineRate, {
          trend: assign({}, state.onlineRate.trend, {
            dateValue: action.props.onlineRate.trend.dateValue,
          }),
        }),
      });

    case types.changeTrendDaysSuccess:
      return assign({}, state, {
        onlineRate: assign({}, state.onlineRate, {
          trend: assign({}, state.onlineRate.trend, {
            dataSource: action.data.data.list,
          }),
        }),
      });

    case types.getDevicedetail:
      return assign({}, state, {
        onlineRate: assign({}, state.onlineRate, {
          deviceTable: assign({}, state.onlineRate.deviceTable, {
            chooseType: action.props.onlineRate.deviceTable.chooseType,
            choosedData: action.props.onlineRate.deviceTable.choosedData,
          }),
        }),
      });

    case types.getDevicedetailSuccess:
      return assign({}, state, {
        onlineRate: assign({}, state.onlineRate, {
          deviceTable: assign({}, state.onlineRate.deviceTable, {
            dataSource: action.data.list,
          }),
        }),
      });

    case types.staffAttendanceInit:
      return assign({}, state, {
        node: action.props.node,
        clickedId: action.props.clickedId,
        staffAttendance: assign({}, state.staffAttendance, {
          ready: false,
        }),
      });

    case types.staffAttendanceInitSuccess:
      const len = state.clickedId.split('.').length;
      if (len === 1) {
        return assign({}, state, {
          staffAttendance: assign({}, state.staffAttendance, {
            ready: true,
            headTable: assign({}, state.staffAttendance.headTable, {
              dataSource: action.data[0].data.list,
            }),
            trend: assign({}, state.staffAttendance.trend, {
              dataSource: action.data[1].data.list,
            }),
            detailData: assign({}, state.staffAttendance.detailData, {
              dataSource: action.data[2].data.list,
            }),
          }),
        });
      }
      if (len === 3) {
        return assign({}, state, {
          staffAttendance: assign({}, state.staffAttendance, {
            ready: true,
            headTable: assign({}, state.staffAttendance.headTable, {
              dataSource: action.data[0].data.list,
            }),
            trend: assign({}, state.staffAttendance.trend, {
              dataSource: action.data[1].data.list,
            }),
            detailData: assign({}, state.staffAttendance.detailData, {
              dataSource: action.data[2].data.list,
            }),
          }),
        });
      }
      if (len > 3) {
        return assign({}, state, {

          staffAttendance: assign({}, state.staffAttendance, {
            ready: true,
            headTable: assign({}, state.staffAttendance.headTable, {
              dataSource: action.data[0].data.list,
            }),
            trend: assign({}, state.staffAttendance.trend, {
              dataSource: action.data[1].data.list,
            }),
            detailData: assign({}, state.staffAttendance.detailData, {
              dataSourcePerson: action.data[2].data.list,
              dataSourceTask: action.data[3].data.list,
            }),
          }),
        });
      }


    case types.changeTrendDaysInTab1:

      return assign({}, state, {
        staffAttendance: assign({}, state.staffAttendance, {
          trend: assign({}, state.staffAttendance.trend, {
            dateValue: action.props.staffAttendance.trend.dateValue,
          }),
        }),
      });


    case types.changeTrendDaysInTab1Success:

      return assign({}, state, {
        staffAttendance: assign({}, state.staffAttendance, {
          trend: assign({}, state.staffAttendance.trend, {
            dataSource: action.data.data.list || [],
          }),
        }),
      });

    case types.changeDetailDayTab1:
      return assign({}, state, {
        staffAttendance: assign({}, state.staffAttendance, {
          detailData: assign({}, state.staffAttendance.detailData, {
            choosedData: action.props.staffAttendance.detailData.choosedData,
          }),
        }),
      });


    case types.changeDetailDayTab1Success:
      if (state.clickedId.split('.').length === 1) {
        return assign({}, state, {
          staffAttendance: assign({}, state.staffAttendance, {
            detailData: assign({}, state.staffAttendance.detailData, {
              dataSource: action.data.data.list,
            }),
          }),
        });
      }
      if (state.clickedId.split('.').length === 3) {
        return assign({}, state, {
          staffAttendance: assign({}, state.staffAttendance, {
            detailData: assign({}, state.staffAttendance.detailData, {
              dataSource: action.data.data.list,
            }),
          }),
        });
      }
      if (state.clickedId.split('.').length > 3) {
        return assign({}, state, {
          staffAttendance: assign({}, state.staffAttendance, {
            detailData: assign({}, state.staffAttendance.detailData, {
              dataSourcePerson: action.data[0].data.list,
              dataSourceTask: action.data[1].data.list,
            }),
          }),
        });
      }
      return null;

    case types.changeDetailTypeTab1:
      return assign({}, state, {
        staffAttendance: assign({}, state.staffAttendance, {
          detailData: assign({}, state.staffAttendance.detailData, {
            chooseType: action.props.staffAttendance.detailData.chooseType,
          }),
        }),
      });

    case types.changeCityCenter:
      return assign({}, state, {
        staffAttendance: assign({}, state.staffAttendance, {
          detailData: assign({}, state.staffAttendance.detailData, {
            cityCenter: action.data,
          }),
        }),
      });

    case types.changeMarker:
      return assign({}, state, {
        staffAttendance: assign({}, state.staffAttendance, {
          detailData: assign({}, state.staffAttendance.detailData, {
            marker: action.data,
          }),
        }),
      });


    default:
      return state;
  }
};

export default reducer;
