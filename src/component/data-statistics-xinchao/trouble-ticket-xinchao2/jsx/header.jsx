import React from 'react';
import { Select, Button } from 'antd';
import { Link } from 'react-router-dom';
import { exportExcel } from '../action';

const Option = Select.Option;


const header = (props) => {
  const {
    selectData, formData, dispatch, params: { taskId, regionCode,colType },monthOrWeek
  } = props;
  return (
    <div>
      <div>
        <span style={{ marginRight: 10 }}>统计周期:</span>
        <Select
          style={{ marginRight: 10 }}
          value={colType}
          disabled
        >
          {
            monthOrWeek.map(v => (
              <Option value={v.id}>{v.name}</Option>
            ))
          }
        </Select>
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
          onClick={() => dispatch(exportExcel(props))}
        >导出
        </Button>
      </div>
      <hr style={{ marginRight: 10 }} />
      <Link to={`/data-statistics-xinchao/qa-order-xinchao1/${taskId}/${regionCode}`}>
        返回上一级
      </Link>

    </div>

  );
};


export default header;
