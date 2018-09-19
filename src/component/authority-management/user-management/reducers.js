import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  ready: true,
  list: [],
  openkeys: [],
  deptTree: [],
  pageSize: 10,
  page: 1,
  deptId: '',
  dataSource: [],
  total: '',
  addCustomerVisiable: false,
  addDeptVisiable: false,
  addCityModalVisiable: false,
  addUserVisible: false,
  customerName: '',
  allProvince: [],
  allCity: [],
  choosedProvince: '',
  choosedCity: '',
  customerId: '',
  provinceId: '',
  userFrom: '',
  userName: '',
  userTelephone: '',
  userEmail: '',
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.changeValue:
      return assign({}, state, {
        [action.key]: action.value,
      });

    case types.addUserSuccess:
      return assign({}, state, {
        userFrom: '',
        userName: '',
        userTelephone: '',
        userEmail: '',
      });
    default:
      return state;
  }
};

export default reducer;
