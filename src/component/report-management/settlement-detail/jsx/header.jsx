import React from 'react';
import { message } from 'antd';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { Select, Radio, Button, DatePicker } from 'antd';
import styles from '../style.css';
import { changeValue, submit, download } from '../action';


const { Option, OptGroup } = Select;
const RadioGroup = Radio.Group;
const Header = (props) => {
  const {
    dispatch, month, city, team, chooseValue,
    formData,
  } = props;


  return (
    <div className={styles.head}>
      <div className={styles.month}>
        <div>统计日期</div>
        <div>
          <DatePicker className={styles.dataPicker} data-bind="formData.dataPicker" />
        </div>
        <div style={{ marginLeft: 20 }}>统计月份</div>
        <div>
          <Select
            className={styles.monthSelect}
            allowClear
            data-bind="formData.choosedMonth"
            filterOption={(input, option) =>
              pinyinUtil.getFirstLetter(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
              option.props.children.indexOf(input) >= 0
            }
          >
            {
              month.map(v =>
                (
                  <Option key={v.id}>
                    {v.month}
                  </Option>))
            }
          </Select>
        </div>
      </div>
      <div className={styles.dimension}>
        <div>统计维度</div>
        <div>
          <RadioGroup
            className={styles.radioGroup}
            data-bind="formData.radioValue"
          >
            <Radio className={styles.radio} value={3}><span className={styles.radioFontSize}>全国</span></Radio>
            <Radio className={styles.radio} value={1}><span className={styles.radioFontSize}>城市</span></Radio>
            <Radio className={styles.radio} value={2}><span className={styles.radioFontSize}>人员</span></Radio>
          </RadioGroup>
        </div>
      </div>

      <div className={styles.button}>
        <Button
          onClick={() => {
            dispatch(submit(props));
          }}
        >
          查询
        </Button>


        <Button onClick={() => dispatch(download(props))}>
            导出详细点位清单
        </Button>

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
