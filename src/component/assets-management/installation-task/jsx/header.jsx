import React from 'react';
import { DatePicker, Input, Select, Button } from 'antd';


const Option = Select.Option;
const Header = (props) => {
  const { project,dispatch } = props;
  return (
    <div>

      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex' }}>
          <div style={{
 width: 150, textAlign: 'right', marginRight: 10, lineHeight: '32px',
}}
          >安装单号
          </div>
          <Input
            style={{ width: '150px' }}
            data-bind="formData.installNumber"
          />
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{
 width: 150, textAlign: 'right', marginRight: 10, lineHeight: '32px',
}}
          >任务生成时间
          </div>
          <DatePicker data-bind="formData.taskTime" />
        </div>
      </div>


      <div style={{ display: 'flex', marginTop: '5px' }}>
        <div style={{ display: 'flex' }}>
          <div style={{
 width: 150, textAlign: 'right', marginRight: 10, lineHeight: '32px',
}}
          >设备领用人
          </div>
          <Input style={{ width: '150px' }} data-bind="formData.devicePerson" />
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{
 width: 150, textAlign: 'right', marginRight: 10, lineHeight: '32px',
}}
          >设备领用时间
          </div>
          <DatePicker data-bind="formData.deviceTime" />
        </div>
      </div>

      <div style={{ display: 'flex', marginTop: '5px' }}>
        <div style={{ display: 'flex' }}>
          <div
            style={{
 width: 150, textAlign: 'right', marginRight: 10, lineHeight: '32px',
}}
          >
            所属项目
          </div>
          <Select
            style={{ width: '150px' }}
            value={2}
            data-bind="formData.project"
          >
            {
              project.map(v => (
                <Option value={v.dictCode}>
                  {v.dictNote}
                </Option>
              ))
            }
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
          </Select>
        </div>

        <div style={{ marginLeft: '300px' }}>
          <Button
            onClick={()=>dispatch()}
          >查询
          </Button>
          <Button>新建</Button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;
