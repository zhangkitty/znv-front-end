import React from 'react';
import { Modal, Input } from 'antd';
import { queryDeviceDetail } from '../action';


const { TextArea } = Input;
const tmp = (props) => {
  const { formData, dispatch } = props;
  return (
    <Modal
      title="创建工单"
      visible
    >
      <div style={{ display: 'flex', margin: 5 }}>
        <span style={{ flexBasis: '100px' }}>设备编号:</span>
        <Input
          data-bind="modal.deviceId"
          onPressEnter={() => dispatch(queryDeviceDetail(props))}
          style={{ width: '200px' }}
        />
      </div>
      <div style={{ display: 'flex', margin: 5 }}>
        <span style={{ flexBasis: '100px' }}>项目名称:</span>
        <Input
          disabled
          data-bind="modal.projectName"
          style={{ width: '200px' }}
        />
      </div>
      <div style={{ display: 'flex', margin: 5 }}>
        <span style={{ flexBasis: '100px' }}>物业类型:</span>
        <Input
          disabled
          data-bind="modal.tenementType"
          style={{ width: '200px' }}
        />
      </div>
      <div style={{ display: 'flex', margin: 5 }}>
        <span style={{ flexBasis: '100px' }}>省市区:</span>
        <Input
          disabled
          data-bind="modal.region"
          style={{ width: '200px' }}
        />
      </div>
      <div style={{ display: 'flex', margin: 5 }}>
        <span style={{ flexBasis: '100px' }}>详细地址:</span>
        <Input
          disabled
          data-bind="modal.address"
          style={{ width: '200px' }}
        />
      </div>
      <div style={{ display: 'flex', margin: 5 }}>
        <span style={{ flexBasis: '100px' }}>问题描述:</span>
        <TextArea
          data-bind="modal.description"
          style={{ width: '200px' }}
          rows={4}
        />
      </div>
    </Modal>
  );
};

export default tmp;
