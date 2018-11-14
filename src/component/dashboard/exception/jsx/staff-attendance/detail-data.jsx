import React from 'react';
import { Radio } from 'antd';
import { DatePicker } from 'shineout';
import styles from './style.css';
import BarChart from './barChart';
import ChinaMap from './china-map';
import ProvinceMap from './province-map';
import BmapCity from './bmap-city';
import BmapPerson from './bmap-person';
import assign from 'object-assign';
import { changeDetailDayTab1 } from '../../action';

const RadioGroup = Radio.Group;
const DetailData = (props) => {
  const { dispatch } = props;
  const {
    staffAttendance: {
      detailData: {
        imensiond, choosedImensiond, showType, choosedData, chooseType,
      },
    },
  } = props;

  const { node } = props;
  const len = node.id.split('.').length;

  return (
    <div>
      <h3 style={{ marginLeft: 20 }}>实时城市</h3>

      <div className={styles.firstLine}>
        <div className={styles.firstTips}>请选择日期维度:</div>
        <RadioGroup
          data-bind="staffAttendance.detailData.choosedImensiond"
        >
          {
            imensiond.map(v => <Radio value={v.value} disabled={v.disabled}>{v.name}</Radio>)
          }
        </RadioGroup>
      </div>


      <div className={styles.secendLine}>
        <div className={styles.secendTips}>请选择日期:</div>
        <DatePicker
          placeholder="Select date"
          value={choosedData}
          onChange={v => dispatch(changeDetailDayTab1(assign({}, props, {
            staffAttendance: assign({}, props.staffAttendance, {
              detailData: assign({}, props.staffAttendance.detailData, {
                choosedData: v,
              }),
            }),
          })))}
        />
      </div>

      <div className={styles.thirdLine}>
        <div className={styles.thirdTips}>请选择图标类型:</div>
        <RadioGroup
          data-bind="staffAttendance.detailData.chooseType"
        >
          {
            showType.map(v => <Radio value={v.value}>{v.name}</Radio>)
          }
        </RadioGroup>
      </div>
      {
        chooseType === 0 ? <BarChart {...props} />
          :
        <div style={{ marginTop: 10 }}>
          {
              len < 3 && <ChinaMap {...props} />
          }
          {
              len === 3 && <BmapCity {...props} />
          }
          {
              len > 3 && <BmapPerson {...props} />
          }
          {/* <ProvinceMap {...props} /> */}
        </div>
      }
    </div>
  );
};

export default DetailData;
