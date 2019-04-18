import { request } from 'utils/index';
import getParam from 'utils/getParam';


export const initSer = (props) => {
  console.log(props);

  const data = {
    pageSize: 100000000,
    pageNum: 1,
    taskType: 13,
    taskMode: 1,
  };

  return request({
    url: `/ods/api/task/list/query${getParam(data)}`,
  });
};

