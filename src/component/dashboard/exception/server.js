import { under2Camal } from 'shein-lib/camal-case-convertor';
import { request } from 'utils/index';
import getParam from 'utils/getParam';


export const initSer = (props) => {
  console.log(props);
  return Promise.all([
    request({
      url: '/rqs/exception/getCityTree',
      method: 'get',
    }),
    request({
      url: '/rqs/exception/rate',
      method: 'get',
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

