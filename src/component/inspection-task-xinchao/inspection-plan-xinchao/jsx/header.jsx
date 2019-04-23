import React from 'react';
import { TreeSelect, Select, DatePicker, Button } from 'antd';
import { changeDept, search } from '../action';

const TreeNode = TreeSelect.TreeNode;
const Option = Select.Option;
const { RangePicker } = DatePicker;


const header = (props) => {
  console.log(1);
  const {
    dispatch, dept, person, title, formData: { chooseDept, choosePerson },
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
            <Option value={v.userId}>{`${v.fullName}(${v.empNo})`}</Option>
            ))
        }
      </Select>

      <Select
        style={{ width: 200, marginRight: 10 }}
        allowClear
        data-bind="formData.title"
      >
        {
          title.map(v => (
            <Option value={v}>{v}</Option>
          ))
        }
      </Select>

      <Button
        onClick={() => dispatch(search(props))}
      >
        查询
      </Button>
    </div>
  );
};


export default header;
