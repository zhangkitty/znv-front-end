import { request } from 'utils/index';


export const submitSer = data => request({
  url: '/srm/login/check',
  method: 'POST',
  data: {
    userName: data.userName,
    password: data.password,
  },
});
