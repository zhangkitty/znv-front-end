import React from 'react';
import { Checkbox, DatePicker } from 'shineout';
import assign from 'object-assign';
import { changeCityTrendDays, changeCityList } from '../../action';
import styles from './style.css';
import OnlineNumRate from './city-trend-onlineNumRate';
import OnlineRate from './city-trend-onlineRate';
import OpenRate from './city-trend-openRate';


const tmp = (props) => {
  console.log(props);
  const {
    dispatch, onlineRate: {
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
          onChange={v => dispatch(changeCityTrendDays(assign({}, props, {
            onlineRate: assign({}, props.onlineRate, {
              cityTrend: assign({}, props.onlineRate.cityTrend, {
                dateValue: v || [null, null],
              }),
            }),
          })))}
        />
      </div>
      <div className={styles.firstLine}>
        <div className={styles.firstTips}>请选择对比城市:</div>
        <Checkbox.Group value={chooseCity} onChange={value => dispatch(changeCityList(value))}>
          {
            cityList.map(d => (
              <Checkbox htmlValue={d.areaCode}>{d.areaName}</Checkbox>
            ))
          }
        </Checkbox.Group>
      </div>
      <div style={{ display: 'flex' }}>
        <OnlineNumRate {...props} />
        <OnlineRate {...props} />
        <OpenRate {...props} />
      </div>
    </div>
  );
};

export default tmp;
