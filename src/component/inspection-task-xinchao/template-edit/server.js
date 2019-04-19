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
  return request({
    url: `/ods/api/patrol/item/query${getParam(data)}`,
  });
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

