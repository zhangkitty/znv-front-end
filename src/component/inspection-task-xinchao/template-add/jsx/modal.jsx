import React from 'react';
import assign from 'object-assign';
import { Modal, Select, Input, message } from 'antd';
import { closeModal, queryTaskDetail, createTask } from '../action';


const Option = Select.Option;

const tmp = (props) => {
  const {
    dispatch, formData, modal: { visiable, personList }, create: { buttonLoading }, table: { selectedRowKeys },
  } = props;
  return (
    <Modal
      title="分配巡检人员"
      visible={visiable}
      onOk={() => {
        if (selectedRowKeys.length == 0) {
          return message.info('请选择项目');
        }
        dispatch(createTask(props));
      }}
      onCancel={() => dispatch(closeModal(props))}
      confirmLoading={buttonLoading}
    >
      <div style={{ display: 'flex', marginBottom: 10 }}>
        <span style={{ flexBasis: 200 }}>巡检人员：</span>
        <Select
          style={{ width: 200, lineHeight: 32 }}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={v => dispatch(queryTaskDetail(props, v))}
        >
          {
           personList.map(v => <Option value={v.userId}>{`${v.fullName}(${v.empNo})`}</Option>)
         }
        </Select>

      </div>
      <div style={{ display: 'flex' }}>
        <span style={{ flexBasis: 200 }}>模板标题：</span>
        <Input
          style={{ width: 200, lineHeight: 32 }}
          data-bind="modal.tempTitle"
        />
      </div>
    </Modal>
  );
};

export default tmp;
