import React from 'react';
import { Link } from 'react-router-dom';
import { TreeSelect, Select, DatePicker, Button } from 'antd';
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

      <Button
        onClick={() => dispatch(search(props))}
      >
        查询
      </Button>
      <hr style={{ margin: 10 }} />

      <Link to="/qa-task-xinchao/qa-plan-xinchao-add">
        <Button>
          新增质检计划
        </Button>
      </Link>
    </div>
  );
};


export default header;
