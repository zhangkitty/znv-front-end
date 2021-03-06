import React from 'react';
import PropType from 'prop-types';
import { DatePicker } from 'shineout';
import styles from './style.css';
import { Radio } from 'antd';
import LineChart from './lineChart';
import assign from 'object-assign';
import { changeTrendDays } from '../../action';


const RadioGroup = Radio.Group;
const Trend = (props) => {
  const {
    onlineRate: {
      trend: {
        imensiond, showType, dateValue, choosedImensiond,
      },
    },
    dispatch,
  } = props;
  return (
    <div>
      <h3 style={{ marginLeft: 20 }}>趋势图</h3>
      <div className={styles.firstLine} >
        <div className={styles.firstTips}>请选择展示维度:</div>
        <RadioGroup
          data-bind="onlineRate.trend.choosedImensiond"
        >
          {
            imensiond.map(v => <Radio value={v.value} disabled={v.disabled}>{v.name}</Radio>)
          }
        </RadioGroup>
      </div>

      <div className={styles.secendLine}>
        <div className={styles.secendTips}>请选择日期范围:</div>
        <DatePicker
          disabled={d => d.getTime() >= Date.now() + 1000}
          clearable={false}
          range
          type="date"
          format="yyyy-MM-dd"
          value={dateValue}
          onChange={v => dispatch(changeTrendDays(assign({}, props, {
            onlineRate: assign({}, props.onlineRate, {
              trend: assign({}, props.onlineRate.trend, {
                dateValue: v || [null, null],
              }),
            }),
          })))}
        />
      </div>

      <div className={styles.thirdLine}>
        <div className={styles.thirdTips}>请选择图标类型:</div>
        <RadioGroup
          data-bind="onlineRate.trend.choosedShowType"
        >
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
