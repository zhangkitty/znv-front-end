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
        pageSize, pageNum, title, choosePerson,
      },
    },
  } = action;
  const data = {
    pageNum,
    pageSize,
    taskType: 13,
    taskMode: 2,
    taskName: title,
    staffId: choosePerson,
    staffIdListStr: !choosePerson ? person.map(v => v.userId) : null,
  };
  return request({
    url: `/ods/api/task/list/query${getParam(data)}`,
  });
};

export const changePageSer = (action) => {
  const {
    current,
    props: {
      person,
      formData: {
        pageSize, pageNum, title, choosePerson,
      },
    },
  } = action;
  const data = {
    pageNum: current,
    pageSize,
    taskType: 13,
    taskMode: 2,
    taskName: title,
    staffId: choosePerson,
    staffIdListStr: !choosePerson ? person.map(v => v.userId) : null,
  };
  return request({
    url: `/ods/api/task/list/query${getParam(data)}`,
  });
};

export const changePageSizeSer = (action) => {
  const {
    current,
    size,
    props: {
      person,
      formData: {
        pageSize, pageNum, title, choosePerson,
      },
    },
  } = action;
  const data = {
    pageNum: current,
    pageSize: size,
    taskType: 13,
    taskMode: 2,
    taskName: title,
    staffId: choosePerson,
    staffIdListStr: !choosePerson ? person.map(v => v.userId) : null,
  };
  return request({
    url: `/ods/api/task/list/query${getParam(data)}`,
  });
};
