import React from 'react';
import PropType from 'prop-types';
import { DatePicker } from 'shineout';
import styles from './style.css';
import { Radio } from 'antd';
import LineChart from './lineChart';


const RadioGroup = Radio.Group;
const Trend = (props) => {
  console.log(props);
  const { onlineRate: { trend: { imensiond, showType } } } = props;
  return (
    <div>
      <h3 style={{ marginLeft: 20 }}>趋势图</h3>
      <div className={styles.firstLine}>
        <div className={styles.firstTips}>请选择日期范围:</div>
        <DatePicker
          range
          defaultValue={['2018-05-25', '2018-06-05']}
        />
      </div>

      <div className={styles.secendLine} >
        <div className={styles.secendTips}>请选择展示维度:</div>
        <RadioGroup>
          {
            imensiond.map(v => <Radio >{v.name}</Radio>)
          }
        </RadioGroup>
      </div>

      <div className={styles.thirdLine}>
        <div className={styles.thirdTips}>请选择图标类型:</div>
        <RadioGroup>
          {
            showType.map(v => <Radio value={v.value}>{v.name}</Radio>)
          }
        </RadioGroup>
      </div>

      <LineChart {...props} />

    </div>
  );
};

export default Trend;
