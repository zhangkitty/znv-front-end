import { under2Camal } from 'shein-lib/camal-case-convertor';

import { request } from 'utils/index';
import getParam from 'utils/getParam';


export const initSer = (props) => {
  const data = {
  };
  const data1 = {
    typeCode: '1',
  };
  const data2 = {
  };
  return Promise.all([
    request({
      url: `/srm/role/query/tree${getParam(data)}`,
    }),
    request({
      url: `/srm/resource/query/tree${getParam(data1)}`,
    }),
    request({
      url: `/srm/user/query/tree${getParam(data2)}`,
    }),
  ]);
};

export const addRoleSer = (props) => {
  const data = {
    topOrgId: props.clickedId,
    roleName: props.addRole.roleName,
    description: props.addRole.roleDes,

  };

  return request({
    url: '/srm/role/add',
    method: 'post',
    data,
  });
};

export const openModifyRoleModalSer = (props) => {
  const data = {
    roleId: props.clickedId,
  };
  return request({
    url: `/srm/role/detail${getParam(data)}`,
  });
};

export const deleteRoleSer = (props) => {
  const data = {
    roleId: props.clickedId,
  };
  return request({
    url: '/srm/role/delete',
    method: 'post',
    data,
  });
};

export const getRoleDetailSer = (id) => {
  const data = {
    roleId: id,
  };
  return request({
    url: `/srm/role/detail${getParam(data)}`,
  });
};
