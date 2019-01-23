import { under2Camal } from 'shein-lib/camal-case-convertor';

import { request } from 'utils/index';
import getParam from 'utils/getParam';


export const initSer = (props) => {
  const data = {
    token: 'OGYxZDdlN2MtZjU4ZS00MDViLTkyZWItN2UwZWNkZWIwYzZl',
  };
  return request({
    url: `/srm/role/query/tree${getParam(data)}`,
  });
};
