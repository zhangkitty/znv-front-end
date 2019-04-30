import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  ready: false,
  clickedId: '',
  clickedOrgLevel: '',
  topOrgId: '',
  node: null,
  orgTree: [],
  editOrgTreeData: [],
  roleTreeData: [],
  cityTreeData: [],
  user: {
    userId: '',
    userName: '',
    fullName: '',
    phone: '',
    email: '',
    orgId: '',
  },
  phone: '',

  queryUserFormData: {
    fullName: '',
    phone: '',
    status: null,
  },

  checkedRoleIds: [],
  checkedCityIds: [],

  editOrgModal: {
    visible: false,
    destroy: true,
    dataSource: [],
  },

  editUserModal: {
    visible: false,
    destroy: true,
  },
  page: 1,
  pageSize: 10,
  total: 0,
  searchLoading: false,
  dataSource: [],
};

const transform = data => data.map(v => assign({}, v, {
  id: `${v.id}.${v.topId}`,
  name: `${v.name}`,
  children: (function (a) {
    if (a.children === undefined || a.children === null) {
      return null;
    }
    if (a.children.length > 0) {
      return transform(a.children);
    }
    return null;
  }(v)),
}));

const transformTreeData = data => data.map(v => assign({}, v, {
  title: `${v.name}`,
  key: `${v.id}.${v.topId}`,
  value: `${v.id}.${v.topId}`,
  children: (function (a) {
    if (a.children === undefined || a.children === null) {
      return null;
    }
    if (a.children.length > 0) {
      return transformTreeData(a.children);
    }
    return null;
  }(v)),
}));

const transformRoleTreeData = data => data.map(v => assign({}, v, {
  title: `${v.name}`,
  key: `${v.id}`,
  value: `${v.id}`,
  selectable: `${v.parentId}` !== '0',
  children: (function (a) {
    if (a.children === undefined || a.children === null) {
      return null;
    }
    if (a.children.length > 0) {
      return transformRoleTreeData(a.children);
    }
    return null;
  }(v)),
}));

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.getOrgTree:
      return defaultState;
    case types.changeValue:
      return assign({}, state, {
        [action.key]: action.value,
      });
    case types.getOrgTreeSuccess:
      return assign({}, state, {
        orgTree: transform(action.data.data),
        editOrgTreeData: transformTreeData(action.data.data),
        ready: true,
      });
    case types.openEditOrg:
      return assign({}, state, {
        editOrgModal: assign({}, state.editOrgModal, {
          visible: true,
          destroy: false,
        }),
      });
    case types.closeEditOrg:
      return assign({}, state, {
        editOrgModal: assign({}, state.editOrgModal, {
          visible: false,
          destroy: true,
        }),
      });
    case types.openEditUser:
      return assign({}, state, {
        editUserModal: assign({}, state.editUserModal, {
          visible: true,
          destroy: false,
        }),
      });
    case types.closeEditUser:
      return assign({}, state, {
        editUserModal: assign({}, state.editUserModal, {
          visible: false,
          destroy: true,
        }),
        phone: '',
      });
    case types.getRoleTreeSuccess:
      return assign({}, state, {
        roleTreeData: transformRoleTreeData(action.data.data),
      });
    case types.getUsersSuccess:
      return assign({}, state, {
        searchLoading: false,
        dataSource: action.data.list,
        total: action.data.total,
      });
    case types.changePage:
      return assign({}, state, {
        searchLoading: true,
        page: action.current,
      });
    case types.changePageSize:
      return assign({}, state, {
        searchLoading: true,
        pageSize: action.size,
        page: action.current,
      });
    case types.getUserDetailSuccess:
      return assign({}, state, {
        user: action.data,
        checkedRoleIds: action.data.roleList.map(v => (`${v.roleId}`)),
      });
    case types.clearUserDetail:
      return assign({}, state, {
        user: {
          userId: '',
          userName: '',
          fullName: '',
          phone: '',
          email: '',
          orgId: '',
        },
        checkedRoleIds: [],
        phone: '',
      });

    case types.getCityTreeSuccess:
      return assign({}, state, {
        cityTreeData: transformRoleTreeData(action.data.data),
      });
    default:
      return state;
  }
};

export default reducer;
