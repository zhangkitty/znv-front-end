import React from 'react';
import { TreeSelect, Select, DatePicker, Button, Input } from 'antd';
import { changeDept, search } from '../action';

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
        placeholder="人员"
        data-bind="formData.choosePerson"
      >
        {
          person.map(v => (
            <Option value={v.userId}>{`${v.fullName}(${v.empNo})`}</Option>
            ))
        }
      </Select>

      <RangePicker
        style={{ marginRight: 10 }}
        placeholder={['开始时间', '结束时间']}
        data-bind="formData.date"
        // onChange={onChange}
        // onOk={onOk}
      />

      <Input
        placeholder="项目名称"
        style={{ width: 200, marginRight: 10 }}
        data-bind="formData.projectName"
      />

      <Button
        onClick={() => dispatch(search(props))}
      >
        查询
      </Button>
    </div>
  );
};


export default header;
