import axios from 'axios';
import qs from 'qs';
import config from './config';
import Cookie from './js.cookie';

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const fetch = async (options) => {
  const {
    method = 'get', data, url, ..._options
  } = options;
  let authHeader = {};
  let pdata;
  if (url.includes('/user/authorize')) {
    pdata = {
      grant_type: 'password',
      username: data.username,
      password: data.password,
    };
    const tokenData = await refleshToken(pdata);
    if (tokenData.constructor.name != 'Error') {
      const date = new Date();
      date.setTime(date.getTime() + tokenData.expires_in * 1000);
      Cookie.set('SESSION_NP', btoa(`${data.username}###${data.password}`));
      Cookie.set('SESSION_TOKEN', `Bearer ${tokenData.access_token}`, {
        expires: date,
      });
      authHeader = {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      };
    }
    console.log(tokenData);
  } else if (!url.includes('/user/authorize') && Cookie.get('SESSION_NP')) {
    if (Cookie.get('SESSION_TOKEN')) {
      authHeader = { headers: { Authorization: Cookie.get('SESSION_TOKEN') } };
    } else {
      let temparr = Cookie.get('SESSION_NP');
      temparr = atob(temparr);
      temparr = temparr.split('###');
      pdata = { username: temparr[0], password: temparr[1] };
      const tokenData = await refleshToken(pdata);
      if (tokenData.constructor.name != 'Error') {
        const date = new Date();
        date.setTime(date.getTime() + tokenData.expires_in);
        Cookie.set('SESSION_TOKEN', `Bearer ${tokenData.access_token}`, {
          expires: date,
        });
        authHeader = {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        };
        console.log(tokenData);
      }
    }
  } else {
    Cookie.remove('SESSION_NP');
    Cookie.remove('SESSION_TOKEN');
    // const href = window.location.href.split('#')[0];
    // window.open(`${href}#/login`, '_self');
  }
  const token = localStorage.getItem('token');
  if (!token) {
    const href = window.location.href.split('#')[0];
    window.open(`${href}#/login`, '_self');
  }
  switch (method.toLowerCase()) {
    case 'get':
      if (url.indexOf('?') !== -1) {
        return axios.get(`${url}&token=${token}`);
      }
      return axios.get(`${url}?token=${token}`);
    case 'delete':
      return axios.delete(url, { data, ...authHeader });
    case 'head':
      return axios.head(url, data);
    case 'post': {
      const params = new URLSearchParams();
      for (const key in data) {
        params.append(key, data[key]);
      }
      return axios.post(`${url}?token=${token}`, data, Object.assign(authHeader, _options));
    }
    case 'put':
      return axios.put(url, data, Object.assign(authHeader, _options));
    case 'patch':
      return axios.patch(url, data);
    case 'upload': {
      const form = new FormData();
      form.append('file', data.file);
      authHeader.method = 'post';
      authHeader.headers['Content-Type'] = 'multipart/form-data';
      return axios.post(url, form, authHeader);
    }
    default:
      return axios(options);
  }
};

function refleshToken(pdata) {
  return new Promise((resolve, reject) => {
    // 如果没有或者过期，重新获取token
    axios
      .post(
        `${config.devBaseURL}/oauth2/access_token`,
        { grant_type: 'password', ...pdata },
        {
          method: 'post',
          transformRequest: [
            function (data) {
              let ret = '';
              for (const it in data) {
                ret +=
                  `${encodeURIComponent(it)
                  }=${
                    encodeURIComponent(data[it])
                  }&`;
              }
              return ret;
            },
          ],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
              'Basic ZWdnQ2xpZW50OlNEMTIzZGZqaGdpeTI4ZHNqa2ZiaTEyaHUzdWk=',
          },
        },
      )
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        resolve(error);
      });
  });
}

export default function request(options) {
  if (options.url.indexOf('//') == -1) {
    options.url = config.devBaseURL + options.url;
  }
  const t = new Date().getTime();
  if (options.url.indexOf('?') != -1) {
    const search = options.url.split('?')[0];
    if (search.length > 0) {
      // options.url = `${options.url}&t=${t}`;
      options.url = `${options.url}`;
    } else {
      // options.url = `${options.url}&t=${t}`;
      options.url = `${options.url}`;
    }
  } else {
    // options.url = `${options.url}&t=${t}`;
    options.url = `${options.url}`;
  }

  return fetch(options)
    .then(response => response.data)
    .catch((error) => {
      console.log(error);
      return Promise.resolve(error);
    });
}
