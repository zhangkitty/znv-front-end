import React from 'react';
import PropTypes from 'prop-types';
import { Select, Radio, Button, DatePicker } from 'antd';
import styles from '../style.css';
import { changeValue, submit } from '../action';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const Header = (props) => {
  const {
    dispatch, chooseValue, formData,
  } = props;
  return (
    <div className={styles.head}>

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
            value={chooseValue}
            className={styles.radioGroup}
            onChange={e => dispatch(changeValue('chooseValue', e.target.value))}
          >
            <Radio className={styles.radio} value={1}><span className={styles.radioFontSize}>城市</span></Radio>
            <Radio style={{ display: 'none' }} className={styles.radio} value={2}><span className={styles.radioFontSize}>资产</span></Radio>
          </RadioGroup>
        </div>
      </div>
      <div className={styles.button}>
        <Button
          onClick={() => dispatch(submit(props))}
        >查询
        </Button>
        <Button>导出</Button>
      </div>
      <hr style={{ margin: 20 }} />
    </div>
  );
};

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  chooseValue: PropTypes.string,
  formData: PropTypes.shape(),
  // formData: PropTypes.shape({
  //   kkk: PropTypes.string,
  // }).isRequired,
  // dataLoading: PropTypes.bool.isRequired,
};

export default Header;
