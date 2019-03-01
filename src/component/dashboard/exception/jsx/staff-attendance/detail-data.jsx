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
import { changeDetailDayTab1, changeDetailTypeTab1 } from '../../action';

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
      <h3 style={{ marginLeft: 20 }}>详情信息</h3>

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
          disabled={d => d.getTime() >= Date.now() + 1000}
          placeholder="Select date"
          clearable={false}
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

        <div>
          {
            len > 3 ? null
              :
            <RadioGroup
              value={chooseType}
              onChange={e => dispatch(changeDetailTypeTab1(assign({}, props, {
                staffAttendance: assign({}, props.staffAttendance, {
                  detailData: assign({}, props.staffAttendance.detailData, {
                    chooseType: e.target.value,
                  }),
                }),
              })))}
            >
              {
                showType.map(v => <Radio value={v.value}>{v.name}</Radio>)
              }
            </RadioGroup>
          }
        </div>

      </div>
      {
        (function (len, chooseType) {
          if (len > 3) {
            // return null;
            return <BmapPerson {...props} />;
          }
          if (chooseType === 1) {
            if (len === 3) {
              // return null;
              return <BmapCity {...props} />;
            }
            if (len < 3) {
              return <ChinaMap {...props} />;
            }
          }
          if (chooseType === 2) {
            return <BarChart {...props} />;
          }
          return null;
        }(len, chooseType))
      }
    </div>

  );
};

export default DetailData;
