import React from 'react';
import { Modal, Input } from 'antd';
import { changeValue, addDept } from '../action';
import styles from '../style.css';

const addCustomerModal = (props) => {
  const { addCustomerVisiable, dispatch, customerName } = props;
  return (
    <Modal
      title="新增客户"
      visible={addCustomerVisiable}
      onOk={() => dispatch(addDept(customerName, 0))}
      onCancel={
        () => dispatch(changeValue('addCustomerVisiable', false))
      }
    >
      <div>
        <article className={styles.deptName}>
          <div>客户名称</div>
          <Input
            onChange={e => dispatch(changeValue('customerName', e.target.value))}
          />
        </article>
      </div>
    </Modal>
  );
};

export default addCustomerModal;
