import { under2Camal } from 'shein-lib/camal-case-convertor';
import { request } from 'utils/index';

export const getDeptTreeSer = action => request({
  mothod: 'get',
  url: '/sys/dept/getDeptTree?level=0',
});

export const getUserByDeptIdSer = action => request({
  url: '/user/getUserByDeptId',
  method: 'post',
  data: {
    pageSize: action.props.pageSize,
    page: action.props.page,
    deptId: action.props.deptId,
  },
});

export const addDeptSer = action => request({
  url: '/sys/dept/addDept',
  method: 'post',
  data: {
    name: action.deptName,
    parent_id: action.parentId,
  },
});

export const getAllProvinceSer = () => request({
  method: 'get',
  url: '/sys/getAllProvince',
});

export const getAllCityByProvinceIdSer = action => request({
  method: 'get',
  url: `/sys/getAllCityByProvinceId?id=${action.value}`,
});

export const getAllCityByProvinceNameSer = action => request({
  method: 'get',
  url: `/sys/getAllCityByProvinceName?name=${action.value}`,
});

export const addUserSer = action => request({
  method: 'post',
  url: '/user/addUser',
  data: {
    username: action.props.userName,
    telephone: action.props.userTelephone,
    mail: action.props.userEmail,
    dept_id: action.props.userFrom,
  },
});
