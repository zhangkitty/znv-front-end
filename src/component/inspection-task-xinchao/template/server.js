import { request } from 'utils/index';
import getParam from 'utils/getParam';


export const initSer = (props) => {
  console.log(props);
  const { formData: { pageSize, pageNum } } = props;

  const data = {
    pageSize,
    pageNum,
    taskType: 13,
    taskMode: 1,
  };

  return request({
    url: `/ods/api/task/list/query${getParam(data)}`,
  });
};

export const changeInspectPersonSer = (action) => {
  const { props, v } = action;
  const data = {
    pageSize: 1,
    pageNum: 1,
    taskType: 13,
    taskMode: 1,
    staffId: v,
  };
  return request({
    url: `/ods/api/task/list/query${getParam(data)}`,
  });
};

export const changePageSer = (action) => {
  const { props, current } = action;
  const { formData: { pageSize } } = props;
  const data = {
    pageSize,
    pageNum: current,
    taskType: 13,
    taskMode: 1,
  };
  return request({
    url: `/ods/api/task/list/query${getParam(data)}`,
  });
};

export const changePageSizeSer = (action) => {
  const { props, current, size } = action;
  const data = {
    pageSize: size,
    pageNum: current,
    taskType: 13,
    taskMode: 1,
  };
  return request({
    url: `/ods/api/task/list/query${getParam(data)}`,
  });
};


export const openModalSer = (props) => {
  const data = {
    roleId: 101,
  };
  return request({
    url: `/srm/role/user/list/query${getParam(data)}`,
  });
};

export const updateSer = (action) => {
  const {
    props: {
      modal: {
        chooseUser,
        personList,
        tempTitle,
        chooseItem: {
          id, staffId, staffName,
        },
      },
    },
  } = action;
  const data = {
    taskId: id,
    taskName: tempTitle,
    staffId,
    staffName,
    toStaffId: chooseUser,
    toStaffName: personList.filter(v => v.userId == chooseUser)[0].fullName,
    toStaffNo: personList.filter(v => v.userId == chooseUser)[0].empNo,
  };
  return request({
    url: '/ods/api/task/update',
    method: 'post',
    data,
  });
};

