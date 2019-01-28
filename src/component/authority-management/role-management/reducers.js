import assign from 'object-assign';
import { getSize } from 'shein-middlewares/pagesize';
import * as types from './types';

export const defaultState = {
  loading: false,
  clickedId: 1,
  // 新增角色
  addRole: {
    isShow: false,
    roleName: '',
    roleDes: '',
  },
  modifyRole: {
    ready: true,
    isShow: false,
    roleName: '',
    roleDes: '',
  },

  left: {
    tree: [],
  },
  right: {
    ready: true,
    menuTree: [],
    checkedMenuTree: [],
    userTree: [],
  },
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.changeValue:
      return assign({}, state, {
        [action.key]: action.value,
      });

    case types.init:
      return assign({}, state, {
        loading: true,
      });

    case types.initSuccess:
      return assign({}, state, {
        loading: false,
        left: assign({}, state.left, {
          tree: (action.data)[0].data,
        }),
        right: assign({}, state.right, {
          menuTree: (action.data)[1].data,
          userTree: (action.data)[2].data,
        }),

      });

    case types.openAddRoleModal:
      return assign({}, state, {
        addRole: assign({}, state.addRole, {
          isShow: true,
        }),
      });

    case types.choseAddRoleModal:
      return assign({}, state, {
        addRole: assign({}, state.addRole, {
          roleName: '',
          roleDes: '',
          isShow: false,
        }),
      });

    case types.openModifyRoleModal:
      return assign({}, state, {
        modifyRole: assign({}, state.modifyRole, {
          isShow: true,
          ready: false,
        }),
      });

    case types.openModifyRoleModalSuccess:
      return assign({}, state, {
        modifyRole: assign({}, state.modifyRole, {
          ready: true,
          roleName: action.data.data.roleName,
          roleDes: action.data.data.description,
        }),
      });

    case types.closeModifyRoleModal:
      return assign({}, state, {
        modifyRole: assign({}, state.modifyRole, {
          isShow: false,
        }),
      });

    case types.getRoleDetail:
      return assign({}, state, {
        right: assign({}, state.right, {
          ready: false,
        }),
      });

    case types.getRoleDetailSuccess:
      return assign({}, state, {
        right: assign({}, state.right, {
          ready: true,
          checkedMenuTree: action.data.data.resourceList,
        }),
      });
    default:
      return state;
  }
};

export default reducer;
