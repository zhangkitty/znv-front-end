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
      url: `/ods/api/task/title/list/query${getParam(data1)}`,
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
      person,
      formData: {
        choosePerson, pageSize, pageNum, projectName, date, chooseState, chooseTitle,
      },
    },
  } = action;
  const data = {
    pageNum,
    pageSize,
    // taskIdStr: chooseTitle,
    taskType: 13,
    statusCodes: chooseState && [chooseState],
    beginTime: date[0] && `${moment(date[0]).format('YYYY-MM-DD')} 00:00:00`,
    endTime: date[1] && `${moment(date[1]).format('YYYY-MM-DD')} 23:59:59`,
    loginStaffId: localStorage.getItem('userId'),
    staffId: choosePerson,
    itemName: projectName,
    staffIdListStr: !choosePerson ? person.map(v => v.userId).toLocaleString() : null,


  };
  return request({
    method: 'post',
    url: '/wgs/xc/workorder/list/query',
    data,
  });
};
