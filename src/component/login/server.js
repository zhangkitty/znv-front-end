import fetch from '../../../web_modules/shein-lib/fetch';
import { request } from '../../../web_modules/utils/index';

export const submitSer = (data) => {
  console.log(data, 'asfafa');
  return request({
    url: '/user/authorize',
    // url: '/oauth2/access_token',
    method: 'POST',
    data: {
      username: data.userName,
      password: data.password,
      client_id: 'eggClient',
      grant_type: 'password',
    },
  });
};
