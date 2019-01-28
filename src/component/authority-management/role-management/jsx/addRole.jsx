import React from 'react';
import { Modal, Input } from 'antd';
import { choseAddRoleModal, addRole } from '../action';

const tmp = (props) => {
  console.log(props);
  const { dispatch, addRole: { isShow } } = props;
  return (
    <Modal
      visible={isShow}
      title="新增角色"
      onCancel={() => {
        dispatch(choseAddRoleModal());
      }}
      onOk={() => {
        dispatch(addRole(props));
      }}

    >
      <div style={{ display: 'flex', marginBottom: 5 }}>
        <div style={{ flexBasis: 150 }}>角色名</div>
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
