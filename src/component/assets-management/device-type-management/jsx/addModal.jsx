import React from 'react';
import { Modal, Input, Select } from 'antd';
import { changeModalValue, savedevicetype } from '../action';


const Option = Select.Option;

const addModal = (props) => {
  console.log(1);
  const { formData, dispatch, addModal: { visiable, addOrEdit } } = props;
  return (
    <Modal
      title={addOrEdit === 'edit' ? '修改设备类型' : '新增设备类型'}
      visible={visiable}
      onOk={() =>
        dispatch(savedevicetype(props))
      }
      onCancel={() =>
        dispatch(changeModalValue('visiable', false))

      }
    >
      <div style={{ display: 'flex' }}>
        <span style={{ flex: '0 0 100px', lineHeight: '32px' }}>设备类型</span>
        <Input data-bind="addModal.deviceTypeName" />
      </div>

      <div style={{ display: 'flex', marginTop: '5px' }}>
        <span style={{ flexBasis: 100, lineHeight: '32px' }}>是否主设备</span>
        <Select data-bind="addModal.isPrimary">
          <Option value="1">是</Option>
          <Option value="2">否</Option>
        </Select>
      </div>
    </Modal>
  );
};

export default addModal;
