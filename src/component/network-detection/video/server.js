import { request } from 'utils/index';

export const initSer = id => request({
  method: 'post',
  url: '/aps/cmd/execute',
  data: {
    deviceId: `${id}`,
    cmdType: '211',
    accountId: 'hangmei',
  },
});
