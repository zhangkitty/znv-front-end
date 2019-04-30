import { request } from 'utils/index';
import getParam from 'utils/getParam';


export const initSer = (props) => {
  console.log('sb');


  const data = {
    taskType: '14', // 13：巡检 14：质检
  };

  const data1 = {
    taskId: props.params.taskId,
    regionCode: props.params.regionCode,

  };


  return Promise.all([
    request({
      url: `/rqs/xc/tasktitle/query${getParam(data)}`,
    }),
    request({
      url: `/rqs/xc/inspectrate${getParam(data1)}`,
    }),
  ]);
};

