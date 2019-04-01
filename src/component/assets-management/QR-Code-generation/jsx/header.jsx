import React from 'react';
import { Button, Input } from 'antd';
import styles from './style.css';
import {createdevice}  from '../action'

const header = (props) => {
  const {dispatch} = props
  return (
    <div className={styles.one}>
      <span className={styles.label}>请出入生成数量</span>
      <Input className={styles.input} data-bind="number" />
      <Button
        className={styles.button}
        onClick={()=>dispatch(createdevice(props))}
      >
        生成
      </Button>
    </div>
  );
};

export default header;
