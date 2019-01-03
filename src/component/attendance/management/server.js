import { request } from 'utils/index';
import getParam from 'utils/getParam';

export const initSer = props => Promise.all([
  request({
    url: '/rqs/attendance/citylist',
  }),
  request({
    url: '/rqs/attendance/executorlist',
  }),
]);

export const changeCitySer = ({ props, d }) => {
  console.log(props);
  console.log(d);
  const data = {
    areaCode: d,
  };
  return request({
    url: `/rqs/attendance/executorlist${getParam(data)}`,
  });
};

