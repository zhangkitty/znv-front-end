import React from 'react';
import { DatePicker, Button } from 'antd';

const RangePicker = DatePicker.RangePicker;


const Header = (props) => {
  console.log(1);
  return (
    <div style={{ marginTop: 20 }}>
      <div>
        <span style={{ marginRight: 10 }}>统计周期</span>
        <RangePicker
          style={{ marginRight: 10 }}
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          placeholder={['Start Time', 'End Time']}
          data-bind="formData.date"
        />
      </div>

      <div style={{ marginTop: 10 }}>
        <Button>
          查询
        </Button>
      </div>


    </div>
  );
};

export default Header;
