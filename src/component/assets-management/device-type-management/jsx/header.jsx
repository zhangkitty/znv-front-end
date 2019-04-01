import React from 'react';
import { Input, Button, Select } from 'antd';
import styles from './style.css';
import { submit, changeModalValue } from '../action';


const Option = Select.Option;

const header = (props) => {
  console.log(1);

  const { formData, dispatch, deviceType } = props;
  return (
    <div className={styles.headerAll}>
      <div className={styles.one}>
        <span>设备类型</span>
        <Select
          data-bind="formData.deviceType"
          className={styles.deviceType}
          allowClear
        >
          {
              deviceType.map(v => (
                <Option value={v.dictCode}>{v.dictNote}</Option>
              ))
            }

        </Select>
      </div>

      <div className={styles.two}>
        <Button
          onClick={() => dispatch(submit(props))}
        >
          查询
        </Button>
        <Button
          onClick={() => {
            dispatch(changeModalValue('addOrEdit', 'add'));
            dispatch(changeModalValue('deviceType', ''));
            dispatch(changeModalValue('deviceTypeName', ''));
            dispatch(changeModalValue('isPrimary', '1'));
            dispatch(changeModalValue('visiable', true));
          }}
        >
          新建
        </Button>
      </div>


    </div>
  );
};

export default header;
