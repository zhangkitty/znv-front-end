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
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.change:
      return assign({}, state, {
        [action.key]: action.value,
      });
    case types.init:
      return assign({}, state, {
        quotaType: action.props.quotaType,
      });
    case types.initSuccess:
      return assign({}, state, {
        dataSource: action.data.data.list.map(v => ([v.longitude, v.latitude])),
      });
    default:
      return state;
  }
};

export default reducer;
