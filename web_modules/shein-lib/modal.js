import { Modal } from 'antd';

/**
 * 一般最后一个才能作为默认参数
 * @funcNmae showMessage
 * @param msg   string
 * @param fun   func
 * @param success bool
 */


export default (msg, success, time = 10000, cb = () => {}) => {
  let modal;
  const handle = setTimeout(() => {
    modal.destroy();
    cb();
  }, time);
  if (success) {
    modal = Modal.success({
      title: msg,
      maskClosable: true,
      onOk() {
        clearTimeout(handle);
        cb();
      },
    });
  } else {
    modal = Modal.error({
      title: msg,
      maskClosable: true,
      onOk() {
        clearTimeout(handle);
        cb();
      },
    });
  }
};
