import React from 'react';
import { Radio, Select } from 'antd';
import PropTypes from 'prop-types';
import styles from './style.css';
import BarChart from './barChart';

const RadioGroup = Radio.Group;
const DetailData = (props) => {
  const { onlineRate: { detailData: { imensiond, showType } } } = props;
  return (
    <div>
      <h3 style={{ marginLeft: 20 }}>明细数据</h3>

      <div className={styles.firstLine}>
        <div className={styles.firstTips}>请选择日期维度:</div>
        <RadioGroup>
          {
            imensiond.map(v => <Radio>{v.name}</Radio>)
          }
        </RadioGroup>
      </div>

      <div className={styles.secendLine}>
        <div className={styles.secendTips}>请选择日期:</div>
        <Select
          style={{ width: 80 }}
          size="small"
          data={[1, 2, 3]}
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
