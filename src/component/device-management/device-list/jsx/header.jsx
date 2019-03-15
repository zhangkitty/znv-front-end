import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Select } from 'antd';
import { serach } from '../action';
import styles from '../style.css';

const Option = Select.Option;
const Header = (props) => {
  const {
    dispatch,
    cityData,
    receiveData,
    onlineData,
    formData,
  } = props;
  return (
    <div>

      <div className={styles.flexBox} style={{ paddingTop: 0 }}>
        <div className={styles.all}>
          <span className={styles.one}>地区</span>
          <Select data-bind="formData.city" className={styles.two}>
            {
              cityData.map(v => (<Option value={v.areaCode}>
                {v.areaName}
              </Option>))
            }
          </Select>
        </div>

        <div className={styles.all}>
          <span className={styles.one}>资产名称</span>
          <Input className={styles.two} data-bind="formData.name" />
        </div>

        <div className={styles.all}>
          <span className={styles.one}>资产ID</span>
          <Input className={styles.two} data-bind="formData.Id" />
        </div>

      </div>

      <div className={styles.flexBox} style={{ paddingTop: 0 }}>
        <div className={styles.all}>
          <span className={styles.one}>接收状态</span>
          <Select data-bind="formData.receiveState" className={styles.two}>
            {
              receiveData.map(v => (
                <Option value={v.value}>
                  {v.name}
                </Option>))
            }
          </Select>
        </div>

        <div className={styles.all}>
          <span className={styles.one}>被监控设备在线状态</span>
          <Select data-bind="formData.onlineState" className={styles.two}>
            {
              onlineData.map(v => (
                <Option value={v.value}>
                  {v.name}
                </Option>))
            }
          </Select>
        </div>

        <div className={styles.all}>
          <span className={styles.one} />
          <Button
            className={styles.two}
            style={{ width: 80 }}
            type="primary"
            onClick={() => dispatch(serach(props))}
          >查询
          </Button>
        </div>
      </div>


    </div>

  );
};

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    kkk: PropTypes.string,
  }).isRequired,
  dataLoading: PropTypes.bool.isRequired,
};

export default Header;
