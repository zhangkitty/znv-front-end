import { request } from 'utils/index';
import { MD5 } from 'utils/index';


export const submitSer = data => request({
  url: '/srm/login/check',
  method: 'POST',
  data: {
    userName: data.userName,
    password: MD5(data.password),
  },
});
