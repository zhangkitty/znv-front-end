import { message } from 'antd';
import assign from 'object-assign';
import 'whatwg-fetch';

const fetch = process.env.NODE_ENV === 'test' ? global.fetch : window.fetch;
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

const relogin = {
  230102: 'user status is wrong',
  230103: 'user not exist',
  230104: 'IP not allowed',
  230105: 'system not allowed',
  230106: 'token not valid',
  800005: 'token error',
};

export default (url, args = {}, header) => (
  fetch(`${process.env.BASE_URI}${url}`, assign({
    credentials: 'include',
    headers: header || {
      'content-type': 'application/json',
      token: localStorage.getItem('token'),
    },
  }, args))
)
  .then((res) => {
    const { status } = res;
    if (status > 300) {
      showMessage('服务器响应出错,请尝试 刷新 重试,或者联系开发人员需求帮助  _(:3 」∠)_');
      throw new Error(status);
    }
    const code = res.headers.get('x-code');
    const msg = res.headers.get('x-err-msg');
    if (relogin[code]) {
      const e = new Error();
      e.loginNeeded = true;
      throw e;
    }
    if (res.headers.get('content-type') === 'application/vnd.ms-excel;charset=UTF-8') {
      return res.blob();
    }

    if (code === '0') {
      return res.json().catch(() => ({
        code,
      }));
    }
    return res.text().then(() => ({
      error: decodeURIComponent(msg),
    }));
  });
