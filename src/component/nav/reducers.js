import assign from 'object-assign';
import { LOCATION_CHANGE } from 'react-router-redux';

import * as types from './types';

const menus = [
  {
    title: '首页',
    icon: 'mobile',
    link: '/dashboard/ppppp',
  },
  {
    title: '异常中心',
    icon: 'bars',
    link: '/dashboard/exception',
  },
  {
    title: '设备管理',
    icon: 'bars',
    link: '/device-management',
    children: [
      {
        title: '资产列表',
        link: '/device-management/list',
      },
      {
        title: '不可接收资产列表',
        link: '/device-management/connot-receive-list',
      },
    ],
  },
  {
    title: '告警管理',
    icon: 'bars',
    link: '/alarm-management',
    children: [
      {
        title: '告警列表',
        link: '/alarm-management/list',
      },
    ],
  },
  {
    title: '调度中心',
    icon: 'bars',
    link: '/dispatch-center',
    children: [
      {
        title: '城市调度',
        link: '/dispatch-center/a',
      },
      {
        title: '广告机',
        link: '/dispatch-center/xxxx',
      },
    ],
  },
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
  {
    title: '考勤管理',
    icon: 'bars',
    // link: '/attendance/management',
    link: '/attendance',
    children: [
      {
        title: '考勤数据',
        link: '/attendance/management',
      },
    ],
  },
  {
    title: '全网检测',
    icon: 'bars',
    link: '/network-detection',
    children: [
      {
        title: 'FSU显示',
        link: '/network-detection/show-fsu',
      },
      {
        title: 'FSU地图',
        link: '/network-detection/fsu',
      },
    ],
  },
  {
    title: '任务管理',
    icon: 'bars',
    link: '/task-manager',
    children: [
      {
        title: '工单列表',
        link: '/task-manager/work-order-list',
      },
    ],
  },
  // {
  //   title: '任务',
  //   icon: 'bars',
  //   link: '/task',
  //   children: [
  //     {
  //       title: '任务管理',
  //       link: '/task/task-manager/list',
  //
  //     },
  //   ],
  // },
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
  .sort((item1, item2) => item1.link.length - item2.link.length);


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
