import { message } from 'antd';
import assign from 'object-assign';
import { hashHistory } from 'react-router';
import 'whatwg-fetch';

let fetch;
if (process.env.NODE_ENV === 'test') {
  fetch = global.fetch;
} else {
  fetch = window.fetch;
}
let messageShowed = false;

function showMessage(msg, fn = () => {}) {
  if (!messageShowed) {
    messageShowed = true;
    message.error(msg, 3);
    setTimeout(() => {
      messageShowed = false;
      fn();
    }, 3000);
  }
}

export default (url, options = {}) => {
  const urlWithCredential = url;
  return fetch(urlWithCredential, assign({
    credentials: 'include',
  }, options)).then((res) => {
    const { headers, status } = res;
    if (process.env.NODE_ENV !== 'test') {
      const error = headers.get('XErrorInfo');
      if (error) {
        showMessage(decodeURIComponent(error));
      }
      if (status === 302 && res.url.indexOf(`${process.env.BASE_URI}/Sign`) === -1) {
        // showMessage('我们认为您应该登录一下', () => {});
        // const err = Error('Login needed');
        // err.loginNeeded = true;
        // throw err;
        hashHistory.push('/login');
      }
      if (status === 404) {
        // console.log(res);
        // hashHistory.push('/error-pages/404');
        showMessage('服务器响应出错,请刷新页面', () => {});
      }
      if (status === 500) {
        showMessage('服务器响应超时,请刷新页面', () => {});
      }
    }
    return res;
  });
};
