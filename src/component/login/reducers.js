import assign from 'object-assign';
import { getSize } from 'shein-middlewares/pagesize';
import * as types from './types';
import moment from 'moment';
import { onHover } from './action';
import { set, get } from 'utils/set';


export const defaultState = {
  x: null,
  y: null,
  hoveredObject: null,
  dataSource: [],
  dataSource1: [],
  dataSource2: [],
  dataSource3: [],
  dataTime: moment().subtract(1, 'day').format('YYYY-MM-DD'),
  quotaType: 1,
  loading: true,
  radius: 10000,
  elevationScale: 3000,
  hoverData: {
    areaName: '',
    devTotal: '',
    devOnlineNum: '',
    onlineStableNum: '',
    offlineFrequentNum: '',
    offlineOvertimeNum: '',
  },
};


const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.change:
      return assign({}, state, {
        [action.key]: action.value,
      });
    case types.init:
      return assign({}, state, {
        loading: false,
        quotaType: action.props.quotaType ? action.props.quotaType : state.quotaType,
        dataTime: action.props.dataTime ? action.props.dataTime : state.dataTime,
      });
    case types.initSuccess:
      if (action.props.quotaType === 1) {
        set(`${action.props.dataTime}-1`, action.data.data.list.map(v => ([v.longitude, v.latitude])));
        return assign({}, state, {
          loading: true,
          dataSource1: action.data.data.list.map(v => ([v.longitude, v.latitude])),
          dataSource: action.data.data.list.map(v => ([v.longitude, v.latitude])),
          quotaType: 1,
        });
      }

      if (action.props.quotaType === 2) {
        set(`${action.props.dataTime}-2`, action.data.data.list.map(v => ([v.longitude, v.latitude])));
        return assign({}, state, {
          loading: true,
          dataSource2: action.data.data.list.map(v => ([v.longitude, v.latitude])),
          dataSource: action.data.data.list.map(v => ([v.longitude, v.latitude])),
          quotaType: 2,
        });
      }

      if (action.props.quotaType === 3) {
        set(`${action.props.dataTime}-3`, action.data.data.list.map(v => ([v.longitude, v.latitude])));
        return assign({}, state, {
          loading: true,
          dataSource3: action.data.data.list.map(v => ([v.longitude, v.latitude])),
          dataSource: action.data.data.list.map(v => ([v.longitude, v.latitude])),
          quotaType: 3,
        });
      }

    case types.onHover:
      return assign({}, state, {
        hoverData: assign({}, state.hoverData, {
          areaName: '',
          devTotal: '',
          devOnlineNum: '',
          onlineStableNum: '',
          offlineFrequentNum: '',
          offlineOvertimeNum: '',
        }),
      });

    case types.onHoverSuccess:
      return assign({}, state, {
        hoverData: assign({}, state.hoverData, {
          areaName: action.data.data.areaName,
          devTotal: action.data.data.devTotal,
          devOnlineNum: action.data.data.devOnlineNum,
          onlineStableNum: action.data.data.onlineStableNum,
          offlineFrequentNum: action.data.data.offlineFrequentNum,
          offlineOvertimeNum: action.data.data.offlineOvertimeNum,
        }),
      });
    default:
      return state;
  }
};

export default reducer;
