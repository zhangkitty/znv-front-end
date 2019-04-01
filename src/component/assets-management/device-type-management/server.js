import { under2Camal } from 'shein-lib/camal-case-convertor';
import request from 'utils/request';
import getParam from 'utils/getParam';


export const initSer = (props) => {
  const data = {
    colName: 'devicetype',
  };
  return request({
    url: `/ams/device/dropdown${getParam(data)}`,
  });
};


export const submitSer = (props) => {
  const { formData } = props;
  const data = {
    staffId: 1111,
    pageSize: 10,
    pageNum: 1,
    deviceType: formData.deviceType,

  };
  return request({
    url: `/ams/manage/querydevicetype${getParam(data)}`,
  });
};

export const savedevicetypeSer = (props) => {
  const { addModal } = props;
  const data = {
    staffId: 1111,
    deviceType: addModal.deviceType,
    deviceTypeName: addModal.deviceTypeName,
    isPrimary: addModal.isPrimary,
  };
  return request({
    method: 'post',
    url: '/ams/manage/savedevicetype',
    data,
  });
};

export const deleteDeviceTypeSer = ({ props, deviceType }) => {
  const data = {
    deviceType,
    staffId: '1111',
  };
  return request({
    method: 'post',
    url: '/ams/manage/deldevicetype',
    data,
  });
};
