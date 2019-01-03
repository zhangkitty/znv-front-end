import { request } from 'utils/index';
import axios from 'axios/index';
import Cookie from 'utils/js.cookie';
import getParam from 'utils/getParam';


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
  console.log(props, 'sdfafsafasdf');
  return request({
    url: '/omc.znv.com/main/fsumanage/getareaoffline.do?groupId=1',
  });
};

export const getProviceDataSer = props => request({
  url: `/omc.znv.com/main/fsumanage/getareaoffline.do?groupId=${props}`,
});


export const initContentSer = (props) => {
  console.log('initContentSer');
  const { id } = props;
  return Promise.all([
    request({
      url: `/aps/api/monitor/detail/device?deviceId=${id}`,
    }),
    request({
      url: '/aps/api/monitor/live/user/list',
      method: 'post',
      data: {
        deviceId: `${id}`,
      },
    }),
  ]);
};

export const getPictureSer = (props) => {
  const { AlarmInfo } = props;
  const { id } = props;
  const temp = AlarmInfo.map(v => request({
    url: '/aps/api/monitor/picture/show',
    method: 'post',
    data: {
      deviceId: `${id}`,
      pictureTime: v.alarmTime,
    },
  }));

  // temp.push(request({
  //   url: '/aps/api/monitor/picture/show',
  //   method: 'post',
  //   data: {
  //     deviceId: `${id}`,
  //   },
  // }));

  return Promise.all(temp);
};

export const getPicture1Ser = (props) => {
  const { deviceId } = props;
  return request({
    url: '/aps/api/monitor/picture/show',
    method: 'post',
    data: {
      deviceId,
    },
  });
};

export const liveSer = (props) => {
  const { id } = props;
  return request({
    method: 'post',
    url: '/aps/cmd/execute',
    data: {
      deviceId: `${props}`,
      cmdType: '211',
      accountId: 'hangmei',
    },
  });
};

export const trendSer = param => request({
  url: `/aps/api/monitor/mete/trend${getParam(param)}`,
});
