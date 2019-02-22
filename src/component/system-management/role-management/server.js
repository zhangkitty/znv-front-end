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

export const getPermissionAndUserDetailSer = (id) => {
  const data = {
    roleId: id,
  };
  return Promise.all([
    request({
      url: `/srm/role/detail${getParam(data)}`,
    }),
    request({
      url: `/srm/role/user/query${getParam(data)}`,
    }),
  ]).then(res => res);
};

export const submitSer = (props) => {
  const menuTree = props.right.menuTree;
  const checkedMenuTree = props.right.checkedMenuTree;
  const tmp = [];
  const addcrumb = (arr, crumb) => arr.map((v) => {
    if (v == null) {
      return null;
    }
    return Object.assign({}, v, {
      crumb: `${crumb},${v.id}`,
      children: v.children ? addcrumb(v.children, `${crumb},${v.id}`) : null,
    });
  });
  const result = addcrumb(menuTree, 0);
  const transform = arr => arr.map((v) => {
    if (checkedMenuTree.includes(v.id)) {
      tmp.push(v.crumb.split(',').map(t => Number(t)));
    }
    if (v.children == null) {
      return null;
    }
    transform(v.children);
  });
  transform(result);
  const res = tmp.reduce((sum, val) => sum = sum.concat(val), []);
  const data = {
    roleId: props.clickNode.id,
    roleName: props.clickNode.name,
    resourceList: [...new Set(props.right.checkedMenuTree.concat(res).filter(v => v != 0))],
  };

  const data1 = {
    roleId: props.clickNode.id,
    addList: props.right.checkedUserTree,
    delList: props.right.checkedUserTreeBark.filter(v => !props.right.checkedUserTree.includes(v)),
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
