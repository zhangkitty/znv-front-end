import { under2Camal } from 'shein-lib/camal-case-convertor';

import { request } from 'utils/index';
import getParam from 'utils/getParam';


export const initSer = (props) => {
  const data = {
    token: 'YmE2MmEyNDYtMTY4NS00OGRmLTkxY2QtNjE5NmZjMmIwY2Y1',
  };
  return request({
    url: `/srm/role/query/tree${getParam(data)}`,
  });
};
