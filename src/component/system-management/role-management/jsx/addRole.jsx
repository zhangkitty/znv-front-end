import React from 'react';
import { Modal, Input, message } from 'antd';
import { choseAddRoleModal, addRole } from '../action';

const tmp = (props) => {
  const { dispatch, addRole: { isShow, roleName, roleDes } } = props;
  return (
    <Modal
      visible={isShow}
      title="新增角色"
      onCancel={() => {
        dispatch(choseAddRoleModal());
      }}
      onOk={() => {
        if (!roleName) {
          return message.error('请输入必要的信息');
        }
        if (roleName.length > 20) {
          return message.error('输入角色名太长');
        }
        if (roleDes.length > 50) {
          return message.error('输入描述太长');
        }
        dispatch(addRole(props));
      }}

    >
      <div style={{ display: 'flex', marginBottom: 5 }}>
        <div style={{ flexBasis: 150 }}>角色名(必填)</div>
        <Input
          data-bind="addRole.roleName"
        />
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flexBasis: 150 }}>角色描述</div>
        <Input.TextArea
          data-bind="addRole.roleDes"
          rows={4}
        />
      </div>
    </Modal>
  );
};

export default tmp;
