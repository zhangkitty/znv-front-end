import React from 'react';
import { TreeSelect, Select, DatePicker, Button } from 'antd';
import { changeDept } from '../action';

const TreeNode = TreeSelect.TreeNode;
const Option = Select.Option;
const { RangePicker } = DatePicker;


const header = (props) => {
  console.log(1);
  const {
    dispatch, dept, person, formData: { chooseDept, choosePerson },
  } = props;


  return (
    <div style={{ marginTop: 10 }}>
      <TreeSelect
        style={{ width: 200, marginRight: 10 }}
        treeData={dept}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeDefaultExpandAll
        value={chooseDept}
        onChange={v => dispatch(changeDept(props, v))}
      />

      <Select
        style={{ width: 200, marginRight: 10 }}
        allowClear
        data-bind="formData.choosePerson"
      >
        {
          person.map(v => (
            <Option value={v.userId}>{v.userName}</Option>
            ))
        }
      </Select>

      <DatePicker
        style={{ marginRight: 10 }}
        onChange={v => console.log(v)}
      />

      <Button >
        查询
      </Button>
    </div>
  );
};


export default header;
