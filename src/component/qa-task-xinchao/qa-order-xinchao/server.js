import { request } from 'utils/index';
import getParam from 'utils/getParam';
import moment from 'moment';


export const initSer = (props) => {
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
        choosePerson, pageSize, pageNum, projectName, date, chooseState,
      },
    },
  } = action;
  const data = {
    pageNum,
    pageSize,
    taskType: 14,
    statusCodes: [chooseState],
    beginTime: date[0] && moment(date[0]).format('YYYY-MM-DD'),
    endTime: date[1] && moment(date[1]).format('YYYY-MM-DD'),
    loginStaffId: localStorage.getItem('userId'),
    staffId: choosePerson,
    itemName: projectName,
  };
  return request({
    method: 'post',
    url: '/wgs/xc/workorder/list/query',
    data,
  });
};
