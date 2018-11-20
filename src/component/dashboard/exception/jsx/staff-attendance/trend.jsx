import React from 'react';
import PropType from 'prop-types';
import { DatePicker } from 'shineout';
import styles from './style.css';
import { Radio } from 'antd';
import LineChart from './lineChart';
import { changeTrendDaysInTab1 } from '../../action';
import assign from 'object-assign';


const RadioGroup = Radio.Group;
const Trend = (props) => {
  const {
    dispatch,
    staffAttendance: {
      trend: {
        imensiond, choosedImensiond, showType, dateValue,
      },
    },
  } = props;
  return (
    <div>
      <h3 style={{ marginLeft: 20 }}>趋势图</h3>
      <div className={styles.firstLine}>
        <div className={styles.firstTips}>请选择日期范围:</div>
        <DatePicker
          range
          clearable={false}
          type="date"
          format="yyyy-MM-dd"
          value={dateValue}
          onChange={v => dispatch(changeTrendDaysInTab1(assign({}, props, {
            staffAttendance: assign({}, props.staffAttendance, {
              trend: assign({}, props.staffAttendance.trend, {
                dateValue: v,
              }),
            }),
          })))}
        />
      </div>

      <div className={styles.secendLine} >
        <div className={styles.secendTips}>请选择展示维度:</div>
        <RadioGroup
          data-bind="staffAttendance.trend.choosedImensiond"
        >
          {
            imensiond.map(v => <Radio value={v.value} disabled={v.disabled}>{v.name}</Radio>)
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
