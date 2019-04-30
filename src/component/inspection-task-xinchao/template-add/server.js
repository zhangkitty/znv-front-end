import { request } from 'utils/index';
import getParam from 'utils/getParam';


export const searchSer = (props) => {
  console.log(props);
  const { formData: { pageSize, pageNum, projectName } } = props;

  const data = {
    pageSize,
    pageNum,
    itemName: projectName,
    areaCode: localStorage.getItem('areaCode'),
    areaCodeStr: localStorage.getItem('areaCodeStr'),
  };
  return request({
    url: `/ods/api/patrol/item/query${getParam(data)}`,
  });
};

export const changePageSer = (action) => {
  const { props, current } = action;
  const { formData: { pageSize, projectName } } = props;
  const data = {
    pageSize,
    pageNum: current,
    itemName: projectName,
    areaCode: localStorage.getItem('areaCode'),
    areaCodeStr: localStorage.getItem('areaCodeStr'),
  };
  return request({
    url: `/ods/api/patrol/item/query${getParam(data)}`,
  });
};

export const changePageSizeSer = (action) => {
  const { props, current, size } = action;
  const { formData: { pageSize, pageNum, projectName } } = props;
  const data = {
    pageSize: size,
    pageNum: current,
    itemName: projectName,
    areaCode: localStorage.getItem('areaCode'),
    areaCodeStr: localStorage.getItem('areaCodeStr'),
  };
  return request({
    url: `/ods/api/patrol/item/query${getParam(data)}`,
  });
};

export const openModalSer = (action) => {
  const data = {
    roleId: 101,
  };
  return request({
    url: `/srm/role/user/list/query${getParam(data)}`,
  });
};

export const queryTaskDetailSer = (action) => {
  const { props, v } = action;
  const data = {
    taskType: 13,
    taskMode: 1,
    staffId: v,
  };
  return request({
    url: `/ods/api/task/detail/query${getParam(data)}`,
  });
};

export const createTaskSer = (action) => {
  const { props } = action;
  const { modal: { tempTitle, chooseUserId, personList }, table: { selectedRowKeys } } = props;
  const data = {
    taskType: 13,
    taskMode: 1,
    taskName: tempTitle,
    staffId: chooseUserId,
    staffName: (personList.filter(v => chooseUserId === v.userId)[0]).fullName,
    staffNo: (personList.filter(v => chooseUserId === v.userId)[0]).empNo,
    createBy: localStorage.getItem('userId'),
    itemList: selectedRowKeys.map(v => ({
      areaCode: v.split(',')[0],
      itemName: v.split(',')[1],
      propertyType: v.split(',')[2],
      quantity: v.split(',')[3],
    })),
  };

  return request({
    url: '/ods/api/task/create',
    method: 'post',
    data,
  });
};

