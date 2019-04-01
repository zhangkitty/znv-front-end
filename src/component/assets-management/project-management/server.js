import { under2Camal } from 'shein-lib/camal-case-convertor';
import request from 'utils/request';
import getParam from 'utils/getParam';


export const initSer = (props) => {
  const data = {
    colName: 'project',
  };
  const data1 = {
    colName: 'company',
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


export const submitSer = (props) => {
  const { formData } = props;
  const data = {
    staffId: 1111,
    pageSize: 10,
    pageNum: 1,
    projectCode: formData.project,
    customerName: formData.company,

  };
  return request({
    url: `/ams/manage/queryproject${getParam(data)}`,
  });
};

export const savedevicetypeSer = (props) => {
  const { addModal } = props;
  const data = {
    staffId: 1111,
    projectCode: addModal.projectCode,
    projectName: addModal.projectName,
    customerName: addModal.company,
  };
  return request({
    method: 'post',
    url: '/ams/manage/saveproject',
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
