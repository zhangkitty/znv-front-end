import { request } from 'utils/index';
import axios from 'axios/index';
import Cookie from 'utils/js.cookie';


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


export const initSer = (props) => {
  console.log(props);
  return request({
    url: '/omc.znv.com/main/fsumanage/getareaoffline.do?groupId=1',
  });
};

export const getProviceDataSer = props => request({
  url: `/omc.znv.com/main/fsumanage/getareaoffline.do?groupId=${props}`,
});


export const initContentSer = (props) => {
  console.log('initContentSer');
  return Promise.all([
    request({
      url: '/aps/api/monitor/detail/device?deviceId=442c051f03ff',
    }),
    request({
      url: '/aps/api/monitor/live/user/list',
      method: 'post',
      data: {
        deviceId: '442c051f03ff',
      },
    }),
  ]);
};

export const getPictureSer = (props) => {
  const { AlarmInfo } = props;

  const temp = AlarmInfo.map(v => request({
    url: '/aps/api/monitor/picture/show',
    method: 'post',
    data: {
      deviceId: '442c051f03ff',
      pictureTime: v.alarmTime,
    },
  }));

  temp.push(request({
    url: '/aps/api/monitor/picture/show',
    method: 'post',
    data: {
      deviceId: '442c051f03ff',
    },
  }));

  return Promise.all(temp);
};

export const liveSer = props => request({
  method: 'post',
  url: '/aps/cmd/execute',
  data: {
    deviceId: '442c051f03ff',
    cmdType: '211',
    accountId: 'hangmei',
  },
});
