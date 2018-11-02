import { under2Camal } from 'shein-lib/camal-case-convertor';
import { request } from 'utils/index';
import moment from 'moment';
import getParam from 'utils/getParam';


export const initSer = (props) => {
  console.log(props);
  const trendData = {
    type: 1,
    startTime: moment(props.onlineRate.trend.dateValue[0]).format('YYYYMMDD'),
    endTime: moment(props.onlineRate.trend.dateValue[1]).format('YYYYMMDD'),
    areaCode: null,
    executor: null,
  };

  return Promise.all([
    request({
      url: '/rqs/exception/getCityTree',
      method: 'get',
    }),
    request({
      url: '/rqs/exception/rate',
      method: 'get',
    }),
    request({
      url: `/rqs/exception/rate${getParam(trendData)}`,
    }),
  ]).then(res => res);
};

export const getExceptionRateSer = (props) => {
  console.log(props);
  const { node } = props;
  const data = {
    type: 1,
    startTime: null,
    endTime: null,
    areaCode: node.areaCode,
    executor: null,
  };
  return request({
    url: `/rqs/exception/rate${getParam(data)}`,
    method: 'get',
  });
};

