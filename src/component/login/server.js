import { request } from 'utils/index';
import { MD5 } from 'utils/index';


export const submitSer = data => request({
  // url: '/srm/login/check',
  url: '/wgs/xc/auth/login',
  // url: '/aps/api/auth/login',
  // url: '/auc/auth/general/login',
  method: 'POST',
  data: {
    userName: data.userName,
    password: MD5(data.password),
  },
});
