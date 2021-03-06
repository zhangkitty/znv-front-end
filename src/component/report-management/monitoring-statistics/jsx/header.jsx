import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Select, Radio, Button, DatePicker } from 'antd';
import styles from '../style.css';
import { changeValue, submit } from '../action';


const { OptGroup, Option } = Select;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const Header = (props) => {
  const {
    dispatch, city, team, aims, choosedCity, choosedTeam, choosedAims, chooseValue, formData, dataDisabled,
  } = props;
  return (
    <div className={styles.head}>
      <div className={styles.month}>
        <div>统计目标</div>
        <div>
          <Select
            showSearch
            filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
            className={styles.monthSelect}
            value={choosedAims}
            onChange={(value) => {
              if (value) {
                dispatch(changeValue('dataDisabled', false));
              }
              dispatch(changeValue('choosedAims', value));
            }}
          >
            {
              aims.map(v => (
                <Option key={v.taskId}>
                  {`${v.taskName}-${v.publishActionNote}`}
                </Option>))
            }
          </Select>
        </div>
      </div>

      <div className={styles.dimension}>
        <div>统计日期</div>
        <div>
          <RangePicker
            disabled={dataDisabled}
            style={{ width: 300 }}
            data-bind="formData.kkk"
            disabledDate={
              (current) => {
                const startTime = moment(aims.filter(v => v.taskId === choosedAims)[0].startTime);
                const entTime = moment(aims.filter(v => v.taskId === choosedAims)[0].endTime);
                if (current < startTime.startOf('days') || current > entTime) {
                  return true;
                }
                  return false;
              }
            }
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
            showSearch
            className={styles.monthSelect}
            value={choosedCity}
            onChange={value => dispatch(changeValue('choosedCity', value))}
            filterOption={(input, option) =>
              pinyinUtil.getFirstLetter(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
              option.props.children.indexOf(input) >= 0
            }
          >
            <Option value="">全国</Option>
            {
              city.map(v => (
                    v.citys.map(k => <Option key={k.split(',')[0]}>{k.split(',')[1]}</Option>)
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
          onClick={e => dispatch(submit(props))}
        >查询
        </Button>
        <Button>导出未监播明细</Button>
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
