import { request } from 'utils/index';
import getParam from 'utils/getParam';


export const searchSer = (props) => {
  console.log(props);
  const { formData: { pageSize, pageNum, projectName }, params } = props;

  const data = {
    pageSize,
    pageNum,
    itemName: projectName,
    taskId: params.taskId,
  };

  const data1 = {
    taskId: params.taskId,
  };

  return Promise.all([
    request({
      url: `/ods/api/patrol/item/query${getParam(data)}`,
    }),
    request({
      url: `/ods/api/task/item/query${getParam(data1)}`,
    }),
  ]);
};

export const changePageSer = (action) => {
  const { props, current } = action;
  const { formData: { pageSize, projectName }, params } = props;
  const data = {
    pageSize,
    pageNum: current,
    itemName: projectName,
    taskId: params.taskId,
  };
  return request({
    url: `/ods/api/patrol/item/query${getParam(data)}`,
  });
};

export const changePageSizeSer = (action) => {
  const { props, current, size } = action;
  const { formData: { pageSize, pageNum, projectName }, params } = props;
  const data = {
    pageSize: size,
    pageNum: current,
    itemName: projectName,
    taskId: params.taskId,

  };
  return request({
    url: `/ods/api/patrol/item/query${getParam(data)}`,
  });
};

export const createSer = (acton) => {
  const { props: { params, table: { selectedRowKeys } } } = acton;
  const data = {
    taskType: 13,
    taskMode: 1,
    taskName: params.taskId,
    itemList: selectedRowKeys.map(v => ({
      areaCode: v.split(',')[0],
      itemName: v.splist(',')[1],
      propertyType: v.splist(',')[2],
      quantity: v.split(',')[3],
    })),
    staffId: params.staffId,
    staffName: '',
    createBy: localStorage.getItem('userId'),
  };
};

