import React from 'react';
import PropTypes from 'prop-types';
import { Select, Radio, Button } from 'antd';
import styles from '../style.css';
import { submit } from '../action';
import { changeValue } from '../action';


const { Option, OptGroup } = Select;
const RadioGroup = Radio.Group;
const Header = (props) => {
  const {
    dispatch, month, city, team, formData,
  } = props;
  return (
    <div className={styles.head}>
      <div className={styles.month}>
        <div>统计月份</div>
        <div>
          <Select
            className={styles.monthSelect}
            data-bind="formData.choosedMonth"
          >
            {
              month.map(v =>
                <Option key={v.id}>{v.month}</Option>)
            }
          </Select>
        </div>
      </div>
      <div className={styles.dimension}>
        <div>统计维度</div>
        <div>
          <RadioGroup
            className={styles.radioGroup}
            data-bind="formData.chooseValue"
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
            allowClear
            className={styles.monthSelect}
            data-bind="formData.choosedCity"
          >
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
            disabled
            className={styles.monthSelect}
            data-bind="formData.choosedTeam"
          >
            {
              team.map(v =>
                <Option key={v.id}>{v.team}</Option>)
            }
          </Select>
        </div>
      </div>
      <div className={styles.button}>
        <Button
          onClick={() => dispatch(submit(props))}
        >查询
        </Button>
        <Button>导出每日明细</Button>
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