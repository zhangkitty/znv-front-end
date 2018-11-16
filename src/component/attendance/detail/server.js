import { request } from 'utils/index';


export const initSer = props => Promise.all([
  request({
    url: '/aps/api/post/query/clock',
    method: 'post',
    data: {
      staffId: 'XiaoYanXin',
      recordDate: '2018-11-06',
    },
  }),
  request({
    url: '/aps/api/post/trace/query',
    method: 'post',
    data: {
      staffId: 'GuiGui',
      recordDate: '2018-11-06',
    },
  }),
]);
