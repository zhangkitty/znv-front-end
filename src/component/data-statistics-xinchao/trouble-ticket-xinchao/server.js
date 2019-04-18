import { request } from 'utils/index';
import getParam from 'utils/getParam';


export const initSer = (props) => {
  console.log('sb');

  return request({
    url: '/srm/org/query/tree',
  });
};

