import React from 'react';
import PropTypes from 'prop-types';
import { Select, Radio, Button } from 'antd';
import styles from '../style.css';
import { changeValue, submit } from '../action';


const { Option, OptGroup } = Select;
const RadioGroup = Radio.Group;
const Header = (props) => {
  const {
    dispatch, month, city, team, chooseValue, choosedTeam, choosedCity,
  } = props;
  return (
    <div className={styles.head}>
      <div className={styles.month}>
        <div>统计月份</div>
        <div>
          <Select
            className={styles.monthSelect}
            onChange={value => dispatch(changeValue('choosedMonth', value))}
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
            className={styles.monthSelect}
            onChange={value => dispatch(changeValue('choosedCity', value))}
            showSearch
            placeholder="使用首字母快速选择城市"
            filterOption={(input, option) =>
              pinyinUtil.getFirstLetter(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
              option.props.children.indexOf(input) >= 0
            }
          >
            <Option value="">全国</Option>
            {/* { */}
            {/* city.map(v => ( */}
            {/* <OptGroup key={v.pro.key} label={v.pro.province}> */}
            {/* { */}
            {/* v.citys.map(k => <Option key={k.split(',')[0]}>{k.split(',')[1]}</Option>) */}
            {/* } */}
            {/* </OptGroup> */}
            {/* )) */}
            {/* } */}

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
            value={choosedTeam}
            onChange={value => dispatch(changeValue('choosedTeam', value))}
          >
            {
              team.map(v =>
                (
                  <Option
                    value={v.id}
                  >
                    {v.team}
                  </Option>))
            }
          </Select>
        </div>
      </div>
      <div className={styles.button}>
        <Button
          onClick={() => dispatch(submit(props))}
        >
          查询
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
