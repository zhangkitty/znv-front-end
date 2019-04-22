import { request } from 'utils/index';
import getParam from 'utils/getParam';
import moment from 'moment';


export const initSer = (props) => {
  console.log(props);

  const data = {
    pageSize: 1000,
    pageNo: 1,
    orgId: props.formData.chooseDept,
  };

  return Promise.all([
    request({
      url: '/srm/org/query/tree',
    }),

    request({
      url: `/srm/user/query/list${getParam(data)}`,
    }),
  ]).then(res => res);
};

export const changeDeptSer = (props, v) => {
  const data = {
    pageSize: 1000,
    pageNo: 1,
    orgId: v,
  };
  return request({
    url: `/srm/user/query/list${getParam(data)}`,
  });
};

export const searchSer = (action) => {
  const {
    props: {
      formData: {
        projectName, pageNum, pageSize, choosePerson, date,
      },
    },
  } = action;
  const data = {
    itemName: projectName,
    pageNum,
    pageSize,
    staffId: choosePerson,
    loginStaffId: localStorage.getItem('userId'),
    taskType: 15,
    beginTime: moment(date[0]).format('YYYY-MM-DD'),
    endTime: moment(date[1]).format('YYYY-MM-DD'),
  };
  return request({
    url: `/wgs/xc/workorder/list/query${getParam(data)}`,
    method: 'post',
    data,
  });
};

export const queryDeviceDetailSer = (action) => {
  const { props: { modal: { deviceId } } } = action;
  const data = {
    deviceId,
  };
  return request({
    url: '/ods/xcworkorder/device/detail',
    data,
    method: 'post',
  });
};
