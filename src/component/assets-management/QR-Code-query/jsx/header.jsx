import React from 'react';
import { Select, DatePicker, Button } from 'antd';
import styles from './style.css';
import { queryrecordlist } from '../action';


const Option = Select.Option;


const header = (props) => {
  const { dispatch, companyList } = props;
  return (

    <div>
      <div className={styles.one}>
        <div className={styles.left}>
          <span>工厂名称:</span>
          <Select
            data-bind="formData.company"
            className={styles.select}
          >
            {
              companyList.map(v => (
                <Option value={v.dictCode}>{v.dictNote}</Option>
              ))
            }
          </Select>
        </div>

        <div className={styles.right}>
          <span>生成日期:</span>
          <DatePicker data-bind="formData.date" />

        </div>
      </div>

      <div className={styles.two}>
        <Button
          onClick={() => dispatch(queryrecordlist(props))}
        >查询
        </Button>
      </div>

    </div>


  );
};

export default header;
