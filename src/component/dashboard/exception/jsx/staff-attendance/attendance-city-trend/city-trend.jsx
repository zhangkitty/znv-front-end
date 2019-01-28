import React from 'react';
import assign from 'object-assign';
import { Checkbox, DatePicker } from 'shineout';
import styles from '../style.css';
import { changeCityTrendDays1, changeCityList1 } from '../../../action';
import WorkNum from './city-trend-workNum';
import WorkRate from './city-trend-workRate';
import WorkTime from './city-trend-workTime';
import WorkDistance from './city-trend-workDistance';


const tmp = (props) => {
  const {
    dispatch, staffAttendance: {
      cityTrend: {
        cityList, chooseCity, dateValue, dataSource,
      },
    },
  } = props;
  return (
    <div>
      <h3 style={{ marginLeft: 20 }}>城市趋势对比图</h3>
      <div className={styles.secendLine}>
        <div className={styles.secendTips}>请选择日期范围:</div>
        <DatePicker
          disabled={d => d.getTime() >= Date.now() + 1000}
          clearable={false}
          range
          type="date"
          format="yyyy-MM-dd"
          value={dateValue}
          onChange={v => dispatch(changeCityTrendDays1(assign({}, props, {
            staffAttendance: assign({}, props.staffAttendance, {
              cityTrend: assign({}, props.staffAttendance.cityTrend, {
                dateValue: v || [null, null],
              }),
            }),
          })))}
        />
      </div>
      <div className={styles.firstLine}>
        <div className={styles.firstTips}>请选择对比城市:</div>
        <Checkbox.Group value={chooseCity} onChange={value => dispatch(changeCityList1(value))}>
          {
            cityList.map(d => (
              <Checkbox htmlValue={d.areaCode}>{d.areaName}</Checkbox>
            ))
          }
        </Checkbox.Group>
      </div>
      <div style={{ display: 'flex' }}>
        <WorkNum {...props} />
        <WorkRate {...props} />
        <WorkTime {...props} />
        <WorkDistance {...props} />
      </div>

    </div>
  );
};

export default tmp;
