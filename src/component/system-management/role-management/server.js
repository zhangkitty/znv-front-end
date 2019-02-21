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
    topOrgId: props.clickNode.id,
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
    roleId: props.clickNode.id,
  };
  return request({
    url: `/srm/role/detail${getParam(data)}`,
  });
};

export const deleteRoleSer = (props) => {
  const data = {
    roleId: props.clickNode.id,
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

export const submitSer = (props) => {
  const data = {
    roleId: props.clickNode.id,
    roleName: props.clickNode.name,
    resourceList: props.right.checkedMenuTree,
  };

  const data1 = {
    roleId: props.clickNode.id,
    userList: props.right.checkedUserTree.filter(v => v > 10000000),
  };

  return Promise.all([
    request({
      url: '/srm/role/update',
      method: 'post',
      data,
    }),
    request({
      url: '/srm/role/batch/grant',
      method: 'post',
      data: data1,
    }),
  ]);
};

export const modifyRoleSer = (props) => {
  const data = {
    roleId: props.clickNode.id,
    roleName: props.modifyRole.roleName,
    description: props.modifyRole.roleDes,
  };
  return request({
    url: '/srm/role/update',
    method: 'post',
    data,
  });
};
