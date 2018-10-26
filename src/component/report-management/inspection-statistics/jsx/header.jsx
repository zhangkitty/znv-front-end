import React from 'react';
import PropTypes from 'prop-types';
import { Select, Radio, Button, DatePicker } from 'antd';
import styles from '../style.css';
import { changeValue, submit } from '../action';


const { Option, OptGroup } = Select;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const Header = (props) => {
  const {
    dispatch, aims, city, team, choosedAims, choosedCity, choosedTeam, chooseValue, formData,
  } = props;
  return (
    <div className={styles.head}>
      <div className={styles.month}>
        <div>统计目标</div>
        <div>
          <Select
            className={styles.monthSelect}
            value={choosedAims}
            onChange={value => dispatch(changeValue('choosedAims', value))}
          >
            {
              aims.map(v => (
                <Option key={v.taskId}>
                  {`${v.taskName}`}
                </Option>))
            }
          </Select>
        </div>
      </div>

      <div className={styles.dimension}>
        <div>统计日期</div>
        <div>
          <RangePicker
            style={{ width: 300 }}
            data-bind="formData.kkk"
          />
        </div>
      </div>

      <div className={styles.dimension}>
        <div>统计维度</div>
        <div>
          <RadioGroup
            className={styles.radioGroup}
            value={chooseValue}
            onChange={e => dispatch(changeValue('chooseValue', e.target.value))}
          >
            <Radio className={styles.radio} value={1}><span className={styles.radioFontSize}>城市</span></Radio>
            <Radio className={styles.radio} value={2}><span className={styles.radioFontSize}>人员</span></Radio>
          </RadioGroup>
        </div>
      </div>

      <div className={styles.assessment}>
        <div className={styles.label}>考核城市</div>
        <div >
          <Select
            value={choosedCity}
            onChange={value => dispatch(changeValue('choosedCity', value))}
            className={styles.monthSelect}
          >
            <Option value="">全国</Option>
            {
              city.map(v => (
                <OptGroup key={v.pro.key} label={v.pro.province}>
                  {
                    v.citys.map(k => <Option key={k.split(',')[0]}>{k.split(',')[1]}</Option>)
                  }
                </OptGroup>
              ))
            }
          </Select>
        </div>

        <div className={`${styles.label} ${styles.team}`}>考核团队</div>
        <div>
          <Select
            className={styles.monthSelect}
            // value={choosedTeam}
            value="全部"
            onChange={value => dispatch(changeValue('choosedTeam', value))}
          >
            {
              team.map(v => (
                <Option key={v.id}>
                  {v.team}
                </Option>))
            }
          </Select>
        </div>
      </div>
      <div className={styles.button}>
        <Button
          onClick={() => dispatch(submit(props))}
        >查询
        </Button>
        <Button>导出未巡检明细</Button>
      </div>
      <hr style={{ margin: 20 }} />
    </div>
  );
};

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,

  // formData: PropTypes.shape({
  //   kkk: PropTypes.string,
  // }).isRequired,
  // dataLoading: PropTypes.bool.isRequired,
};

export default Header;
