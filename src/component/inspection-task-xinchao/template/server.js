import { request } from 'utils/index';
import getParam from 'utils/getParam';


export const initSer = (props) => {
  console.log(props);

  const data = {
    pageSize: 100000000,
    pageNum: 1,
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
        chooseItem: {
          id, taskName, staffId, staffName,
        },
      },
    },
  } = action;
  const data = {
    taskId: id,
    taskName,
    staffId,
    staffName,
    toStaffId: chooseUser,
  };
  return request({
    url: '/ods/api/task/update',
    method: 'post',
    data,
  });
};

