import React from 'react';
import { Select, Button } from 'antd';
import { search,exportExcel } from '../action';

const Option = Select.Option;


const header = (props) => {
  const { selectData, formData, dispatch } = props;
  return (
    <div>
      <div>
        <span style={{ marginRight: 10 }}>统计周期:</span>
        <Select data-bind="formData.selectValue">
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
          onClick={()=>dispatch(exportExcel(props))}
        >
          导出
        </Button>
      </div>
      <hr style={{ marginRight: 10 }} />
    </div>

  );
};


export default header;
