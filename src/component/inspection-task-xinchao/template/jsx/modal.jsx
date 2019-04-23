import React from 'react';
import assign from 'object-assign';
import { Modal, Select, Input } from 'antd';
import { choseModal, update } from '../action';


const Option = Select.Option;

const tmp = (props) => {
  const {
    dispatch, modal: {
      visiable,
      personList,
    },

  } = props;
  return (
    <Modal
      title="转移他人"
      visible={visiable}
      onCancel={() => dispatch(choseModal(props))}
      onOk={() => dispatch(update(props))}
    >

      <div style={{
        display: 'flex',
        marginBottom: 10,
      }}
      >
        <span style={{ flexBasis: 200 }}>模板标题：</span>
        <Input
          disabled
          data-bind="modal.tempTitle"
          style={{
            width: 200,
            lineHeight: 32,
          }}
        />
      </div>

      <div style={{ display: 'flex' }}>
        <span style={{ flexBasis: 200 }}>巡检人员：</span>
        <Select
          data-bind="modal.chooseUser"
          style={{
            width: 200,
            lineHeight: 32,
          }}
        >
          {
            personList.map(v => <Option value={v.userId}>{v.fullName}</Option>)
          }
        </Select>

      </div>

    </Modal>
  );
};

export default tmp;