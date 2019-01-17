import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Select, DatePicker } from 'antd';
import { serach } from '../action';
import styles from '../style.css';

const Option = Select.Option;
const { RangePicker } = DatePicker;
const Header = (props) => {
  const {
    dispatch,
    cityData,
    workOrderType,
    workOrderStatus,
    deviceType,
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
          <span className={styles.one}>工单类型</span>
          <Select data-bind="formData.workOrderType" className={styles.two}>
            {
              workOrderType.map(v => (<Option value={v.value}>
                {v.name}
              </Option>))
            }
          </Select>
        </div>

        <div className={styles.all}>
          <span className={styles.one}>工单状态</span>
          <Select data-bind="formData.workOrderStatus" className={styles.two}>
            {
              workOrderStatus.map(v => (<Option value={v.dictCode}>
                {v.dictNote}
              </Option>))
            }
          </Select>
        </div>

        <div className={styles.all}>
          <span className={styles.one}>处理人</span>
          <Input className={styles.two} data-bind="formData.name" />
        </div>

      </div>

      <div className={styles.flexBox} style={{ paddingTop: 0 }}>


        <div className={styles.all}>
          <span className={styles.one}>设备类型</span>
          <Select data-bind="formData.deviceType" className={styles.two}>
            {
              deviceType.map(v => (
                <Option value={v.value}>
                  {v.name}
                </Option>))
            }
          </Select>
        </div>

        <div className={styles.all}>
          <span className={styles.one}>时间</span>
          <RangePicker
            allowClear={false}
            className={styles.two}
            style={{ width: 250 }}
            data-bind="formData.date"
          />
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
