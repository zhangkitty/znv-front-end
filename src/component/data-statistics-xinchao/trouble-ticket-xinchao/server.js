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

export const choooseSer = (action) => {
  const { v } = action;

  const data = {
    taskType: '15', // 13：巡检 14：质检 15:故障
    colType: v,
  };
  return request({
    url: `/wgs/xc/rqs/tasktitle/query${getParam(data)}`,
  });
};


export const searchSer = (props) => {
  const { formData, monthOrWeekValue } = props;

  const data = {
    taskId: formData.selectValue,
    colType: monthOrWeekValue,
  };

  return request({
    url: `/rqs/xc/faultrate${getParam(data)}`,
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

