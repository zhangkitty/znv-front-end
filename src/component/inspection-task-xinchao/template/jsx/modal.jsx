import React from 'react';
import assign from 'object-assign';
import { Modal, Select, Input } from 'antd';
import { choseModal, update, changeInspectPerson } from '../action';


const Option = Select.Option;

const tmp = (props) => {
  const {
    dispatch, modal: {
      visiable,
      personList,
      chooseUser,
    },

  } = props;
  return (
    <Modal
      title="转移他人"
      visible={visiable}
      onCancel={() => dispatch(choseModal(props))}
      onOk={() => dispatch(update(props))}
    >

      <div style={{ display: 'flex', marginBottom: 10 }}>
        <span style={{ flexBasis: 200 }}>巡检人员：</span>
        <Select
          onChange={v => dispatch(changeInspectPerson(props, v))}
          style={{
            width: 200,
            lineHeight: 32,
          }}
          value={chooseUser}
        >
          {
            personList.map(v => <Option value={v.userId}>{`${v.fullName}(${v.empNo})`}</Option>)
          }
        </Select>

      </div>

      <div style={{
        display: 'flex',
      }}
      >
        <span style={{ flexBasis: 200 }}>模板标题：</span>
        <Input
          data-bind="modal.tempTitle"
          style={{
            width: 200,
            lineHeight: 32,
          }}
        />
      </div>


    </Modal>
  );
};

export default tmp;
