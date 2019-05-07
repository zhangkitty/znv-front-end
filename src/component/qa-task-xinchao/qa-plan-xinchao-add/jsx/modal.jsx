import React from 'react';
import assign from 'object-assign';
import moment from 'moment';
import { Modal, Select, Input, DatePicker, message } from 'antd';
import { closeModal, queryTaskDetail, createTask } from '../action';


const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const tmp = (props) => {
  const {
    dispatch, formData, modal: { visiable, personList }, create: { buttonLoading }, table: {
      selectedRowKeys,
    },
  } = props;
  return (
    <Modal
      title="分配质检人员"
      visible={visiable}
      onOk={() => {
        if (selectedRowKeys.length == 0) {
          return message.info('需要选择项目');
        }
        dispatch(createTask(props));
      }}
      onCancel={() => dispatch(closeModal(props))}
      confirmLoading={buttonLoading}
    >
      <div style={{ display: 'flex', marginBottom: 10 }}>
        <span style={{ flexBasis: 200 }}>质检人员：</span>
        <Select
          style={{ width: 300, lineHeight: 32 }}
          onChange={v => dispatch(queryTaskDetail(props, v))}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {
           personList.map(v => <Option value={v.userId}>{`${v.fullName}(${v.empNo})`}</Option>)
         }
        </Select>

      </div>
      <div style={{ display: 'flex' }}>
        <span style={{ flexBasis: 200 }}>质检时间：</span>
        <RangePicker
          style={{ width: 300, lineHeight: 32 }}
          data-bind="modal.date"
          disabledDate={current => current && current < moment().subtract(1, 'days').endOf('day')}
        />
      </div>
    </Modal>
  );
};

export default tmp;
