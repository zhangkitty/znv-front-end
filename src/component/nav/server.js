import { request } from 'utils/index';
import getParam from 'utils/getParam';


export const getResourceSer = (props) => {
  const data = {
    token: localStorage.getItem('token'),
    typeCode: 1,
    module: 'OSS',
  };
  return request({
    url: `/srm/user/query/resource${getParam(data)}`,
  });
};
