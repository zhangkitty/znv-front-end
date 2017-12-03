import assign from 'object-assign';
import * as types from './types';

const menus = [
  {
    children: [
      {
        link: '/test/a',
        title: '项目名称2',
        icon: 'mail',
      },
    ],
    title: '项目名称1',
    icon: 'mail',
  },
];

const defaultState = {
  current: '/',
  menus,
  userName: '',
  expandable: true,
  list: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.CHANGE_VALUE:
      return assign({}, state, {
        [action.key]: action.value,
      });
    default:
      return state;
  }
};
