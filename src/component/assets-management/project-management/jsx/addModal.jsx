import React from 'react';
import { Modal, Input, Select } from 'antd';
import { changeModalValue, savedevicetype } from '../action';


const Option = Select.Option;

const addModal = (props) => {
  const { formData, dispatch, addModal: { visiable, addOrEdit } } = props;
  return (
    <Modal
      title={addOrEdit === 'edit' ? '修改项目' : '新增项目'}
      visible={visiable}
      onOk={() =>
        dispatch(savedevicetype(props))
      }
      onCancel={() =>
        dispatch(changeModalValue('visiable', false))

      }
    >
      <div style={{ display: 'flex' }}>
        <span style={{ flex: '0 0 100px', lineHeight: '32px' }}>项目名称</span>
        <Input data-bind="addModal.projectName" />
      </div>

      <div style={{ display: 'flex', marginTop: '5px' }}>
        <span style={{ flex: '0 0 100px', lineHeight: '32px' }}>客户全名</span>
        <Input data-bind="addModal.company" />
      </div>
    </Modal>
  );
};

export default addModal;
