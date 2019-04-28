import React from 'react';
import { TreeSelect, Select, DatePicker, Button, Input } from 'antd';
import { changeDept, search } from '../action';

const TreeNode = TreeSelect.TreeNode;
const Option = Select.Option;
const { RangePicker } = DatePicker;


const header = (props) => {
  console.log(1);
  const {
    dispatch, dept, person, formData: { chooseDept, choosePerson }, status, expiredFlagTable,
  } = props;


  return (
    <div style={{ marginTop: 10 }}>
      <div>
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

        <Select
          style={{ width: 200, marginRight: 10 }}
          allowClear
          placeholder="状态"
          data-bind="formData.chooseStatus"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {
            status.map(v => (
              <Option value={v.id}>{v.name}</Option>
            ))
          }
        </Select>
      </div>

      <div style={{ marginTop: 10 }}>
        <Select
          style={{ width: 200, marginRight: 10 }}
          allowClear
          placeholder="是否超期"
          data-bind="formData.expiredFlag"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {
            expiredFlagTable.map(v => (
              <Option value={v.id}>{v.name}</Option>
            ))
          }
        </Select>

        <Input
          placeholder="项目名称"
          style={{ width: 200, marginRight: 10 }}
          data-bind="formData.projectName"
        />

        <RangePicker
          style={{ marginRight: 10 }}
          placeholder={['开始时间', '结束时间']}
          data-bind="formData.date"
          // onChange={onChange}
          // onOk={onOk}
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
