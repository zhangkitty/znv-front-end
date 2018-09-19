import React from 'react';
import { Modal, TreeSelect, Input } from 'antd';
import { changeValue, addUser } from '../action';
import styles from '../style.css';


const { TreeNode } = TreeSelect;
const addUserPage = (props) => {
  const {
    dispatch, addUserVisible, deptTree, userFrom, userName, userTelephone, userEmail,
  } = props;

  const treeData = deptTree.map(v => Object.assign({}, v, {
    title: v.value.name,
    value: v.value.id,
    key: v.value.id,
    disabled: true,
    children: v.detail.map(k => Object.assign({}, k, {
      title: k.value.name,
      value: k.value.id,
      key: k.value.id,
      disabled: true,
      children: k.detail.map(t => Object.assign({}, t, {
        title: t.value.name,
        value: t.value.id,
        key: t.value.id,
      })),
    })),
  }));
  return (
    <Modal
      visible={addUserVisible}
      onCancel={() => dispatch(changeValue('addUserVisible', false))}
      title="添加用户"
      onOk={() => dispatch(addUser(props))}
    >
      <div className={styles.userFrom}>
        <div>用户来源</div>
        <TreeSelect
          className={styles.treeSelect}
          treeData={treeData}
          value={userFrom}
          onChange={value => dispatch(changeValue('userFrom', value))}
        />
      </div>
      <div className={styles.userName}>
        <div>用户姓名</div>
        <Input
          style={{ width: 200 }}
          value={userName}
          onChange={e => dispatch(changeValue('userName', e.target.value))}
        />
      </div>

      <div className={styles.userTelephone}>
        <div>用户电话</div>
        <Input
          style={{ width: 200 }}
          value={userTelephone}
          onChange={e => dispatch(changeValue('userTelephone', e.target.value))}
        />

      </div>
      <div className={styles.userEmail}>
        <div>用户邮箱</div>
        <Input
          style={{ width: 200 }}
          value={userEmail}
          onChange={e => dispatch(changeValue('userEmail', e.target.value))}
        />
      </div>
    </Modal>);
};

export default addUserPage;
