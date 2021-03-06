import React from 'react';
import { Select, Button } from 'antd';
import { Link } from 'react-router-dom';
import {exportExcel} from '../action';

const Option = Select.Option;


const header = (props) => {
  const {
    selectData, formData, dispatch, params: { taskId },
  } = props;
  return (
    <div>
      <div>
        <span style={{ marginRight: 10 }}>统计周期:</span>
        <Select
          data-bind="formData.selectValue"
          disabled
        >
          {
            selectData.map(v => (
              <Option value={v.taskId}>{v.taskName}</Option>
            ))
          }
        </Select>
      </div>
      <div style={{ marginTop: 10 }}>
        <Button
          onClick={()=>dispatch(exportExcel(props))}
        >
          导出
        </Button>
      </div>
      <hr style={{ marginRight: 10 }} />
      <Link to={`/data-statistics-xinchao/inspection-order-xinchao/${taskId}`}>
        返回上一级
      </Link>

    </div>

  );
};


export default header;
