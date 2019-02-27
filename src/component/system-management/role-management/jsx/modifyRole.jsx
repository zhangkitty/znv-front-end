import React from 'react';
import { Modal, Input, Spin, message } from 'antd';
import { closeModifyRoleModal, modifyRole } from '../action';


const tmp = (props) => {
  const {
    dispatch, modifyRole: {
      isShow, ready, roleName, roleDes,
    },
  } = props;
  return (
    <Modal
      visible={isShow}
      title="修改角色"
      onCancel={() => {
        dispatch(closeModifyRoleModal());
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
