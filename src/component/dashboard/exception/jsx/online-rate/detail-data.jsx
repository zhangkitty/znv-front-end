import React from 'react';
import { Radio } from 'antd';
import { Select } from 'shineout';
import PropTypes from 'prop-types';
import styles from './style.css';
import BarChart from './barChart';
import moment from 'moment';

const RadioGroup = Radio.Group;
const DetailData = (props) => {
  const { onlineRate: { detailData: { imensiond, showType } } } = props;
  const { onlineRate: { trend: { dateValue } } } = props;

  const selectDay = [];
  for (let i = 0; i < (moment(dateValue[1]).endOf('days').unix() - moment(dateValue[0]).startOf('days').unix()) / (3600 * 24); i++) {
    console.log(moment(dateValue[0]).add(i, 'd').format('YYYY-MM-DD'));
    selectDay.push(moment(dateValue[0]).add(i, 'd').format('YYYY-MM-DD'));
  }
  return (
    <div>
      <h3 style={{ marginLeft: 20 }}>明细数据</h3>

      <div className={styles.firstLine}>
        <div className={styles.firstTips}>请选择日期维度:</div>
        <RadioGroup
          data-bind="onlineRate.detailData.choosedImensiond"
        >
          {
            imensiond.map(v => <Radio value={v.value} disabled={v.disabled}>{v.name}</Radio>)
          }
        </RadioGroup>
      </div>

      <div className={styles.secendLine}>
        <div className={styles.secendTips}>请选择日期:</div>
        <Select
          style={{ width: 120 }}
          size="small"
          data={selectDay}
          data-bind="onlineRate.detailData.choosedData"
        />
      </div>

      <div className={styles.thirdLine}>
        <div className={styles.thirdTips}>请选择图标类型:</div>
        <RadioGroup>
          {
            showType.map(v => <Radio value={v.value}>{v.name}</Radio>)
          }
        </RadioGroup>
      </div>
      <BarChart {...this.props} />
    </div>
  );
};

export default DetailData;
