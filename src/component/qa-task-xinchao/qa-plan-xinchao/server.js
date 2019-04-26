import { request } from 'utils/index';
import getParam from 'utils/getParam';


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
  const { props: { person, formData: { pageSize, pageNum, choosePerson } } } = action;
  const data = {
    pageSize,
    pageNum,
    taskType: 14,
    taskMode: 1,
    staffId: choosePerson,
    staffIdListStr: !choosePerson ? person.map(v => v.userId) : null,
  };
  return request({
    url: `/ods/api/task/list/query${getParam(data)}`,
  });
};

export const changePageSer = (action) => {
  const { props: { person, formData: { pageSize, choosePerson } }, current } = action;
  const data = {
    pageSize,
    pageNum: current,
    taskType: 14,
    taskMode: 1,
    staffId: choosePerson,
    staffIdListStr: !choosePerson ? person.map(v => v.userId) : null,
  };
  return request({
    url: `/ods/api/task/list/query${getParam(data)}`,
  });
};

export const changePageSizeSer = (action) => {
  const { props: { person, formData: { choosePerson } }, current, size } = action;
  const data = {
    pageSize: size,
    pageNum: current,
    taskType: 14,
    taskMode: 1,
    staffId: choosePerson,
    staffIdListStr: !choosePerson ? person.map(v => v.userId) : null,
  };
  return request({
    url: `/ods/api/task/list/query${getParam(data)}`,
  });
};
