import { request } from 'utils/index';
import getParam from 'utils/getParam';


export const initSer = (props) => {
  console.log(props);

  const data = {
    pageSize: 1000,
    pageNo: 1,
    orgId: props.formData.chooseDept,
  };

  const data1 = {
    taskType: 13,
    taskMode: 2,
  };

  return Promise.all([
    request({
      url: '/srm/org/query/tree',
    }),

    request({
      url: `/srm/user/query/list${getParam(data)}`,
    }),

    request({
      url: `/wgs/xc/task/title/list/query${getParam(data1)}`,
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
        choosePerson, pageSize, pageNum, projectName, date,
      },
    },
  } = action;
  const data = {
    pageNum,
    pageSize,
    taskId: '',
    taskType: 13,
    statusCodes: [1],
    beginTime: date[0],
    endTime: date[1],
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
