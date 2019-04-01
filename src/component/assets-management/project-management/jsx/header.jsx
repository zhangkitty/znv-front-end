import React from 'react';
import { Input, Button, Select } from 'antd';
import styles from './style.css';
import { submit, changeModalValue } from '../action';


const Option = Select.Option;

const header = (props) => {
  const {
    formData, dispatch, project, company,
  } = props;
  return (
    <div className={styles.headerAll}>
      <div className={styles.one}>
        <div className={styles.left}>
          <span>项目名称</span>
          <Select
            style={{ width: 150, marginLeft: 10 }}
            data-bind="formData.project"
            allowClear
          >
            {
              project.map(v => (
                <Option value={v.dictCode}>{v.dictNote}</Option>
              ))
            }
          </Select>
        </div>

        <div className={styles.right}>
          <span>客户全名</span>
          <Select
            style={{ width: 150, marginLeft: 10 }}
            data-bind="formData.company"
            allowClear
          >
            {
              company.map(v => (
                <Option value={v.dictNote}>{v.dictNote}</Option>
              ))
            }

          </Select>
        </div>
      </div>

      <div className={styles.two}>
        <Button
          onClick={() => dispatch(submit(props))}
        >
          查询
        </Button>
        <Button
          onClick={() => {
            dispatch(changeModalValue('addOrEdit', 'add'));
            dispatch(changeModalValue('projectCode', ''));
            dispatch(changeModalValue('projectName', ''));
            dispatch(changeModalValue('company', ''));
            dispatch(changeModalValue('visiable', true));
          }}
        >
          新建
        </Button>
      </div>


    </div>
  );
};

export default header;
