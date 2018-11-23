import axios from 'axios';
import { request } from 'utils/index';

export const login = () => {
  const form = new FormData();
  form.append('username', 'admin');
  form.append('password', '49f630ae4d6212db43a412d4f73730f0');
  return axios.post(
    '/omc.znv.com/jsonlogin.do',
    // '/oss/jsonlogin.do',
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

export const initSer = props =>
  // const form = new FormData();
  // form.append('start', '0');
  // form.append('length', '20');
  // return axios.post(
  //   '/omc/main/fsumanage/jsonfsulist.do',
  //   form,
  //   {
  //     method: 'post',
  //     headers: {
  //       Accept: '*/*',
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //   },
  // );
  request({
    url: '/omc.znv.com/main/fsumanage/jsonareas.do',
  });
  // request({
  //   url: '/oss/main/fsumanage/jsonareas.do',
  // });


export const searchSer = (props) => {
  const form = new FormData();
  form.append('start', (props.page - 1) * props.pageSize);
  form.append('length', props.pageSize);
  const data = {
    aids: props.formData.choosedArea.id, // 区域
    id: props.formData.FSUNum, // FSU序列号
    fsuid: props.formData.FSUID, // FSUID
    station: props.formData.siteName, // 站址名称
    state: props.formData.status, //
    fsukind: props.formData.type,
  };
  for (const key in data) {
    if (data[key]) {
      form.append(key, data[key]);
    }
  }
  return axios.post('/omc.znv.com/main/fsumanage/jsonfsulist.do', form, {
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};
