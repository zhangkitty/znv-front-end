import React from 'react';
import { Select, Button } from 'antd';
import { search, choose, exportExcel } from '../action';

const Option = Select.Option;


const header = (props) => {
  const {
    selectData, formData, dispatch, monthOrWeek, monthOrWeekValue, dataSource,
  } = props;
  return (
    <div>
      <div>
        <span style={{ marginRight: 10 }}>统计周期:</span>
        <Select
          style={{ marginRight: 10 }}
          value={monthOrWeekValue}
          onChange={v => dispatch(choose(v))}
        >
          {
            monthOrWeek.map(v => (
              <Option value={v.id}>{v.name}</Option>
            ))
          }
        </Select>
        <Select
          style={{ width: 200 }}
          data-bind="formData.selectValue"
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
          onClick={() => dispatch(search(props))}
        >查询
        </Button>
        <Button
          onClick={() => dispatch(exportExcel(props))}
        >
          导出
        </Button>
      </div>
      <hr style={{ marginRight: 10 }} />
    </div>

  );
};


export default header;
