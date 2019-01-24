import { request } from 'utils/index';



export const initSer = ({ id, dateTime }) => Promise.all([
  // 打卡情况
  request({
    url: '/aps/api/post/query/clock',
    method: 'post',
    data: {
      staffId: id,
      recordDate: dateTime,
    },
  }),

  // 人员轨迹
  request({
    url: '/aps/api/post/trace/query',
    method: 'post',
    data: {
      staffId: id,
      recordDate: dateTime,
    },
  }),

  // 任务轨迹
  request({
    url: '/aps/api/post/staff/task/distribute',
    method: 'post',
    data: {
      staffId: id,
      recordDate: dateTime,
    },
  }),
]);
