import { request } from 'utils/index';
import getParam from 'utils/getParam';


export const initSer = (props) => {
  console.log('sb');


  const data = {
    taskType: '13', // 13：巡检 14：质检
  };

  const data1 = {
    taskId: props.params.taskId,
    companyCode: props.params.companyCode,

  };


  return Promise.all([
    request({
      url: `/rqs/xc/tasktitle/query${getParam(data)}`,
    }),
    request({
      url: `/rqs/xc/patrolrate${getParam(data1)}`,
    }),
  ]);
};

