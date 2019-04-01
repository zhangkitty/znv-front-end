import { under2Camal } from 'shein-lib/camal-case-convertor';
import request from 'utils/request';
import getParam from 'utils/getParam';


export const initSer = (props) => {
  const data = {
    colName: 'devicestatus',
  };
  const data1 = {
    colName: 'devicegrade',
  };
  return Promise.all([
    request({
      url: `/ams/device/dropdown${getParam(data)}`,
    }),
    request({
      url: `/ams/device/dropdown${getParam(data1)}`,
    }),
  ]);
};

export const querylistSer = (props) => {
  const { formData } = props;
  const data = {
    deviceId: formData.deviceCode,
    deviceStatus: formData.deviceStatus,
    trueName: formData.person,
    pageSize: formData.pageSize,
    pageNum: formData.pageNum,
  };
  return request({
    url: `/ams/device/querylist${getParam(data)}`,
  });
};
