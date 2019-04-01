import React from 'react';
import { Select, DatePicker, Button, Input } from 'antd';
import styles from './style.css';
import { querylist } from '../action';


const Option = Select.Option;


const header = (props) => {
  const { dispatch, devicestatusList, devicegradeList } = props;
  return (
    <div className={styles.header}>

      <div className={styles.one}>
        <div className={styles.oneLeft}>
          <span>设备编码:</span>
          <Input data-bind="formData.deviceCode" style={{ width: 200 }} />
        </div>

        <div className={styles.oneRight}>
          <span>设备状态:</span>
          <Select
            data-bind="formData.deviceStatus"
            style={{ width: 150 }}
            allowClear
          >
            {
              devicestatusList.map(v => (
                <Option value={v.dictCode}>{v.dictNote}</Option>
              ))
            }
          </Select>
        </div>
      </div>


      <div className={styles.two}>
        <div className={styles.twoLeft}>
          <span>当前责任人:</span>
          <Input data-bind="formData.person" style={{ width: 200 }} />
        </div>

        <div className={styles.twoRight}>
          <span>设备等级:</span>
          <Select
            data-bind="formData.deviceGrade"
            style={{ width: 150 }}
            allowClear
          >
            {
              devicegradeList.map(v => (
                <Option value={v.dictCode}>{v.dictNote}</Option>
              ))
            }
          </Select>
        </div>
      </div>

      <div style={{ marginTop: 10 }}>
        <Button
          onClick={() => dispatch(querylist(props))}
        >
          查询
        </Button>
      </div>
    </div>


  );
};

export default header;
