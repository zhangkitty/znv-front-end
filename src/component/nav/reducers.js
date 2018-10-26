import assign from 'object-assign';
import { LOCATION_CHANGE } from 'react-router-redux';

import * as types from './types';

const menus = [
  {
    title: '异常中心',
    icon: 'mobile',
    link: '/dashboard/exception',
  },
  // {
  //   title: '功能组1',
  //   icon: 'bars',
  //   link: '/warehouse',
  //   children: [
  //     {
  //       title: '子功能1',
  //       // icon: 'mail',
  //       link: '/warehouse/a',
  //     },
  //     {
  //       title: '子功能2',
  //       // icon: 'mail',
  //       link: '/warehouse/b',
  //       children: [
  //         {
  //           title: '编辑',
  //           link: '/warehouse/b/edit',
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    title: '报表管理',
    icon: 'bars',
    link: '/report-management',
    children: [
      {
        title: '资产接收进度统计',
        link: '/report-management/asset-receipt',
      },
      {
        title: '监播进度统计',
        link: '/report-management/monitoring-statistics',
      },
      {
        title: '巡检进度统计',
        link: '/report-management/inspection-statistics',
      },
      {
        title: '工单类型统计',
        link: '/report-management/work-order-type',
      },
      {
        title: '工单效率月度考核',
        link: '/report-management/work-order-efficiency-monthly',
      },
      {
        title: '工作量月度考核',
        link: '/report-management/workload-monthly',
      },
      {
        title: '结算详情',
        link: '/report-management/settlement-detail',
      },
    ],
  },
  // {
  //   title: '权限管理',
  //   icon: 'bars',
  //   link: '/authority-management',
  //   children: [
  //     {
  //       title: '用户管理',
  //       link: '/authority-management/user-management',
  //     },
  //     {
  //       title: '角色管理',
  //       link: '/authority-management/role-management',
  //     },
  //   ],
  // },
];

const linkList = menus.slice(1).reduce((concated, value) => (
  concated.concat(value.children ? value.children.concat(value) : value)), []);

const routerMatch = current => linkList
  .filter(({ link }) => (link === '/' || `${current}/`.startsWith(`${link}/`)))
  .sort((item1, item2) => item1.link.length > item2.link.length);


// const routerMatch = current => linkList.filter(({ link }) => link === `${current}`);

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
      return Object.assign({}, state, {
        current: action.payload.pathname,
        pathList: menus.slice(0, 1).concat(routerMatch(action.payload.pathname)),
      });
    default:
      return state;
  }
};
