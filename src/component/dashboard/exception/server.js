import { under2Camal } from 'shein-lib/camal-case-convertor';
import { request } from 'utils/index';


export const initSer = (props) => {
  console.log(props);
  return Promise.all([
    request({
      url: '/rqs/exception/getCityTree',
      method: 'get',
    }),
  ]).then(res => res);
};

