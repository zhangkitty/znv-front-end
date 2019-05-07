import { request } from 'utils/index';
import getParam from 'utils/getParam';


export const initSer = (props) => {
  const { params: { colType, companyCode, taskId } } = props;

  const data = {
    taskType: '15', // 13：巡检 14：质检 15:故障
    colType,
  };


  const data1 = {
    taskId,
    colType,
    companyCode: props.params.companyCode,

  };


  return Promise.all([
    request({
      url: `/wgs/xc/rqs/tasktitle/query${getParam(data)}`,
    }),
    request({
      url: `/rqs/xc/faultrate${getParam(data1)}`,
    }),
  ]);
};

