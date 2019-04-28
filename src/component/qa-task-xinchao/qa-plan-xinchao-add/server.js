import { request } from 'utils/index';
import getParam from 'utils/getParam';
import moment from 'moment';


export const searchSer = (props) => {
  console.log(props);
  const { formData: { pageSize, pageNum, projectName } } = props;

  const data = {
    pageSize,
    pageNum,
    itemName: projectName,
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
    roleId: 105,
  };
  return request({
    url: `/srm/role/user/list/query${getParam(data)}`,
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
  const {
    modal: {
      tempTitle, chooseUserId, personList, date,
    }, table: { selectedRowKeys },
  } = props;
  const data = {
    taskType: 14,
    taskMode: 1,
    taskName: tempTitle,
    staffId: chooseUserId,
    toStaffNo: (personList.filter(v => chooseUserId === v.userId)[0]).empNo,
    beginTime: `${moment(date[0]).format('YYYY-MM-DD')} 00:00:00`,
    endTime: `${moment(date[1]).format('YYYY-MM-DD')} 23:59:59 `,
    staffName: (personList.filter(v => chooseUserId === v.userId)[0]).fullName,
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

