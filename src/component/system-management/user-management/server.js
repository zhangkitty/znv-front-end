import { request } from 'utils/index';

export const getOrgTreeSer = (props) => request({
  url: `/srm/org/query/tree?token=${props.token}`,
  method: `get`,
});

export const addOrgSer = (props) => request({
  url: `/srm/org/add?token=${props.token}`,
  method: `post`,
  data: {
    parentOrgId: props.parentOrgId,
    orgName: props.orgName,
  },
});

export const editOrgSer = (props) => request({
  url: `/srm/org/update?token=${props.token}`,
  method: `post`,
  data: {
    orgId: props.clickedId.split('.')[0],
    orgName: props.orgName,
  },
});

export const deleteOrgSer = (props) => request({
  url: `/srm/org/delete?token=${props.token}`,
  method: `post`,
  data: {
    orgId: props.clickedId.split('.')[0],
  },
});

export const getUsersSer = (props, orgId) => {
  const test = {
    pageSize: props.pageSize,
    pageNo: props.page,
    token: props.token,
    orgId: orgId,
  };

  const arr = [];
  for (const [key, value] of Object.entries(test)) {
    if (value) {
      arr.push(`${key}=${value}`);
    }
  }

  return request({
    url: `/srm/user/query/list?${arr.join('&')}`,
    method: 'get',
  }).then(res => res);
};

export const addUserSer = (props) => request({
  url: `/srm/user/add?token=${props.token}`,
  method: `post`,
  data: {
    topOrgId: props.topOrgId,
    orgId: props.orgId,
    userName: props.userName,
    fullName: props.fullName,
    phone: props.phone,
    email: props.email,
    roleList: props.checkedRoleIds,
  },
});

export const editUserSer = (props) => request({
  url: `/srm/user/update?token=${props.token}`,
  method: `post`,
  data: {
    userId: props.userId,
    userName: props.userName,
    fullName: props.fullName,
    phone: props.phone,
    email: props.email,
    orgId: props.orgId,
    roleList: props.checkedRoleIds,
  },
});

export const deleteUserSer = ({ props, userId }) => request({
  url: `/srm/user/delete?token=${props.token}`,
  method: `post`,
  data: {
    userId: userId,
  },
});

export const chgUserStatusSer = ({ props, userId, status }) => request({
  url: `/srm/user/update?token=${props.token}`,
  method: `post`,
  data: {
    userId: userId,
    status: status,
  },
});

export const getUserDetailSer = (props, userId) => request({
  url: `/srm/user/query/detail?token=${props.token}&userId=${userId}`,
  method: `get`,
});

export const resetPwdSer = (props) => request({
  url: `/srm/user/pwd/reset?token=${props.token}`,
  method: `post`,
  data: {
    userId: props.userId,
    phone: props.phone,
  }
});

export const getRoleTreeSer = (props) => request({
  url: `/srm/role/query/tree?token=${props.token}`,
  method: `get`,
});