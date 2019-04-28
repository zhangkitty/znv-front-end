import React from 'react';
import { TreeSelect, Select, DatePicker, Button, Input } from 'antd';
import { changeDept, search } from '../action';

const TreeNode = TreeSelect.TreeNode;
const Option = Select.Option;
const { RangePicker } = DatePicker;


const header = (props) => {
  console.log(1);
  const {
    dispatch, dept, person, title, status, formData: { chooseDept, choosePerson, projectName },
  } = props;


  return (
    <div>
      <div style={{ marginTop: 10 }}>
        <Select
          placeholder="状态"
          allowClear
          style={{ width: 200, marginRight: 10 }}
          data-bind="formData.chooseState"
        >
          {
            status.map(v => <Option value={v.id}>{v.name}</Option>)
          }
        </Select>

        <RangePicker
          style={{ marginRight: 10 }}
          format="YYYY-MM-DD"
          placeholder={['开始时间', '结束时间']}
          data-bind="formData.date"
          // onChange={onChange}
          // onOk={onOk}
        />

      </div>

      <div style={{ marginTop: 10 }}>
        <TreeSelect
          allowClear
          style={{ width: 200, marginRight: 10 }}
          treeData={dept}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeDefaultExpandAll
          value={chooseDept}
          onChange={v => dispatch(changeDept(props, v))}
        />

        <Select
          allowClear
          placeholder="人员"
          style={{ width: 200, marginRight: 10 }}
          data-bind="formData.choosePerson"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {
            person.map(v => (
              <Option value={v.userId}>{`${v.fullName}(${v.empNo})`}</Option>
            ))
          }
        </Select>


        <Input
          allowClear
          style={{ width: 200, marginRight: 10 }}
          placeholder="项目名称"
          data-bind="formData.projectName"
        />

        <Button
          onClick={() => dispatch(search(props))}
        >
          查询
        </Button>
      </div>


    </div>
  );
};


export default header;
