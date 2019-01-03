import assign from 'object-assign';
import { getSize } from 'shein-middlewares/pagesize';
import * as types from './types';
import moment from 'moment';

export const defaultState = {
  x: null,
  y: null,
  hoveredObject: null,
  dataSource: [],
  dataTime: moment().subtract(1, 'day').format('YYYY-MM-DD'),
  quotaType: 3,
  loading: true,
  radius: 10000,
  elevationScale: 1000,

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
      return assign({}, state, {
        loading: true,
        dataSource: action.data.data.list.map(v => ([v.longitude, v.latitude])),
      });


    default:
      return state;
  }
};

export default reducer;
