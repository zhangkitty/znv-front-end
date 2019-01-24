import { request } from 'utils/index';
import getParam from 'utils/getParam';
import moment from 'moment';

export const initSer = (props) => {
  const table = {
    10: 'task_state',
  };

  const { formData: { workOrderType } } = props;
  const data = {
    colName: table[workOrderType],
  };
  return Promise.all([
    request({
      url: '/rqs/attendance/citylist',
    }),
    request({
      url: `/rqs-dftc/exception/dictdispatch${getParam(data)}`,
    }),
  ]);
};


export const serachSer = (props) => {
  const {
    formData: {
      city,
      workOrderType,
      workOrderStatus,
      // 处理人
      name,
      deviceType,
      date,
      pageNum,
      pageSize,
    },
  } = props;
  const data = {
    type: props.type,
    woType: workOrderType,
    orderStateCode: workOrderStatus,
    areaCode: city,
    handleName: name,
    createTimeFrom: moment(date[0]).format('YYYY-MM-DD HH:MM:SS'),
    createTimeTo: moment(date[1]).format('YYYY-MM-DD HH:MM:SS'),
    pageNum: props.formData.pageNum,
    pageSize: props.formData.pageSize,
  };
  return request({
    url: `/rqs-dftc/exception/orderlistwarn${getParam(data)}`,
  });
};
