import { request } from 'utils/index';
import getParam from 'utils/getParam';


export const initSer = (action) => {
  const { props } = action;
  const { params, formData: { pageSize, pageNum } } = props;
  const data = {
    pageSize,
    pageNum,
    taskId: params.taskId,
  };
  const data1 = {
    taskId: params.taskId,
  };
  return Promise.all([
    request({
      url: `/ods/api/inspect/item/query${getParam(data)}`,
    }),
    request({
      url: `/ods/api/task/item/query${getParam(data1)}`,
    }),
  ]);
};


export const searchSer = (props) => {
  console.log(props);
  const { params, formData: { pageSize, pageNum, projectName } } = props;

  const data = {
    pageSize,
    pageNum,
    itemName: projectName,
    taskId: params.taskId,
  };
  return request({
    url: `/ods/api/inspect/item/query${getParam(data)}`,
  });
};

export const changePageSer = (action) => {
  const { props, current } = action;
  const { formData: { pageSize, projectName } } = props;
  const data = {
    pageSize,
    pageNum: current,
    itemName: projectName,
  };
  return request({
    url: `/ods/api/inspect/item/query${getParam(data)}`,
  });
};

export const changePageSizeSer = (action) => {
  const { props, current, size } = action;
  const { formData: { pageSize, pageNum, projectName } } = props;
  const data = {
    pageSize: size,
    pageNum: current,
    itemName: projectName,

  };
  return request({
    url: `/ods/api/inspect/item/query${getParam(data)}`,
  });
};

export const openModalSer = (action) => {
  const data = {
    pageSize: 100000,
    pageNum: 1,
    orgId: 11000008,
  };
  return request({
    url: `/srm/user/query/list${getParam(data)}`,
  });
};

export const queryTaskDetailSer = (action) => {
  const { props, v } = action;
  const data = {
    taskType: 14,
    taskMode: 1,
    staffId: v,
  };
  return request({
    url: `/ods/api/task/detail/query${getParam(data)}`,
  });
};

export const createTaskSer = (action) => {
  const { props } = action;
  const { modal: { tempTitle, chooseUserId, personList }, table: { selectedRows } } = props;
  const data = {
    taskType: 14,
    taskMode: 2,
    taskName: tempTitle,
    staffId: chooseUserId,
    staffName: (personList.filter(v => chooseUserId === v.userId)[0]).userName,
    createBy: localStorage.getItem('userId'),
    itemList: selectedRows,
  };

  return request({
    url: '/ods/api/task/create',
    method: 'post',
    data,
  });
};

export const updateSer = (action) => {
  const { props: { table: { selectedRowKeys }, params: { taskId, taskName } } } = action;
  const data = {
    taskId,
    taskName,
    itemList: selectedRowKeys.map(v => ({
      areaCode: v.split(',')[0],
      itemName: v.split(',')[1],
      propertyType: v.split(',')[2],
      quantity: v.split(',')[3],
    })),
  };
  return request({
    url: '/ods/api/task/update',
    method: 'post',
    data,
  });
};

