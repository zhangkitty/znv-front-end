import { request } from 'utils/index';
import getParam from 'utils/getParam';
import moment from 'moment';


function trans(data) {
  if (!data) {
    return null;
  }
  if (typeof data === 'string') {
    return data.split(',').map(v => parseInt(v));
  }
  return [data];
}

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
      person,
      formData: {
        choosePerson, pageSize, pageNum, projectName, date, chooseState,
      },
    },
  } = action;
  const data = {
    pageNum,
    pageSize,
    taskType: 14,
    statusCodes: trans(chooseState),
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

export const changePageSer = (action) => {
  const {
    current,
    props: {
      person,
      formData: {
        choosePerson, pageSize, pageNum, projectName, date, chooseState,
      },
    },
  } = action;
  const data = {
    pageNum: current,
    pageSize,
    taskType: 14,
    statusCodes: trans(chooseState),
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

export const changePageSizeSer = (action) => {
  const {
    current,
    size,
    props: {
      person,
      formData: {
        choosePerson, pageSize, pageNum, projectName, date, chooseState,
      },
    },
  } = action;
  const data = {
    pageNum: current,
    pageSize: size,
    taskType: 14,
    statusCodes: trans(chooseState),
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
