import assign from 'object-assign';
import { LOCATION_CHANGE } from 'react-router-redux';

import * as types from './types';

const menus = [
  {
    title: '功能组1',
    icon: 'bars',
    link: '/warehouse',
    children: [
      {
        link: '/warehouse/a',
        title: '子功能1',
        icon: 'mail',
      },
    ],
  },
];

const linkList = menus.reduce((concated, { children }) => (
  concated.concat(children)), []);

const routerMatch = current => linkList
  .filter(({ link }) => (link === '/' || `${current}/`.startsWith(`${link}/`)))
  .sort((item1, item2) => item1.link.length > item2.link.length);

const defaultState = {
  current: '/',
  menus,
  linkList,
  userName: '',
  expandable: true,
  pathList: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.CHANGE_VALUE:
      return assign({}, state, {
        [action.key]: action.value,
      });
    case LOCATION_CHANGE:
      console.log(action);
      console.log(action.payload.pathname, 'bb');
      console.log(linkList
        .filter(({ link }) => (link === '/' || '/warehouse/a/'.startsWith(`${link}/`))));
      console.log(routerMatch(action.payload.pathname), 'zzzz');
      return Object.assign({}, state, {
        current: action.payload.pathname,
        pathList: routerMatch(action.payload.pathname),
      });
    default:
      return state;
  }
};
