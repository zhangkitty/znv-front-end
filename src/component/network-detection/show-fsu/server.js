import axios from 'axios';
import { request } from 'utils/index';

export const login = () => {
  const form = new FormData();
  form.append('username', 'admin');
  form.append('password', '49f630ae4d6212db43a412d4f73730f0');
  return axios.post(
    '/omc/jsonlogin.do',
    form,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: '*/*',
      },
    },
  );
};

export const initSer = (props) => {
  const form = new FormData();
  form.append('start', '0');
  form.append('length', '20');
  return axios.post(
    '/omc/main/fsumanage/jsonfsulist.do',
    form,
    {
      method: 'post',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
};
