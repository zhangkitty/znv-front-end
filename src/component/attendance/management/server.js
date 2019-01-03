import { request } from 'utils/index';


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
  request({
    url: `/rqs/attendance/executorlist?areaCode=${d.areaCode}`,
  });
};

