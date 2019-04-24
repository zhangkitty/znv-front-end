import { request } from 'utils/index';
import getParam from 'utils/getParam';
import FileSaver from 'file-saver';


export const initSer = (props) => {
  const data = {
    taskType: '15', // 13：巡检 14：质检 15:故障
    colType: '1',
  };

  return request({
    url: `/wgs/xc/rqs/tasktitle/query${getParam(data)}`,
  });
};


export const searchSer = (props) => {
  const { formData } = props;

  const data = {
    taskId: formData.selectValue,
  };

  return request({
    url: `/rqs/xc/patrolrate${getParam(data)}`,
  });
};

export const exportExcelSer = (props) => {
  const { formData, selectData } = props;
  const data = {
    taskId: formData.selectValue,
    taskName: (selectData.filter(v => v.taskId === formData.selectValue)[0]).taskName,
  };
  window.location.href = `${process.env.BASE_URI}/rqs/xc/patrolrate/download${getParam(data)}}`;
};

