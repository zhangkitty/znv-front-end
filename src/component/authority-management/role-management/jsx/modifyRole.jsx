import React from 'react';
import { Modal, Input, Spin } from 'antd';
import { closeModifyRoleModal, modifyRole } from '../action';


const tmp = (props) => {
  const { dispatch, modifyRole: { isShow, ready } } = props;
  return (
    <Modal
      visible={isShow}
      title="修改角色"
      onCancel={() => {
        dispatch(closeModifyRoleModal());
      }}
      onOk={() => {
        dispatch(modifyRole(props));
      }}

    >
      {
        ready ?
          <div>
            <div style={{ display: 'flex', marginBottom: 5 }}>
              <div style={{ flexBasis: 150 }}>角色名</div>
              <Input
                data-bind="modifyRole.roleName"
              />
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ flexBasis: 150 }}>角色描述</div>
              <Input.TextArea
                data-bind="modifyRole.roleDes"
                rows={4}
              />
            </div>
          </div>
          :
          <div style={{ textAlign: 'center' }}>
            <Spin size="small" />
          </div>
      }
    </Modal>
  );
};

export default tmp;
