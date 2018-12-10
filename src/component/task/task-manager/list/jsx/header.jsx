import React from 'react';
import { Input, Select, DatePicker, Button, Upload, Icon } from 'shineout';
import styles from './style.css';

const Header = (props) => {
  console.log(1);
  console.log(props);
  const { formData } = props;
  return (
    <div>
      <div className={styles.oneLine} >
        <Input
          className={styles.oneOne}
          placeholder="创建人"
          data-bind="formData.kkk"
        />
        <Input
          className={styles.oneTwo}
          placeholder="处理人"
          value={formData.test}
        />
        <Select
          className={styles.oneThree}
          placeholder="调度类型"
        />
        <Select
          className={styles.oneFour}
          placeholder="设备类型"
        />
        <Select
          className={styles.oneFive}
          placeholder="故障类型"
        />
        <Select
          className={styles.oneSix}
          placeholder="任务级别"
        />
      </div>
      <div className={styles.twoLine}>
        <Select
          className={styles.twoOne}
          placeholder="状态"
        />
        <Select
          className={styles.twoTwo}
          placeholder="请选择省"
        />
        <Select
          className={styles.twoThree}
          placeholder="请选择市"
        />
        <Select
          className={styles.twoFour}
          placeholder="=请选择区"
        />
        <DatePicker
          className={styles.twoFive}
          range={86400 * 10}
        />
        <Button className={styles.six}>
          查询
        </Button>
      </div>
      <div className={styles.threeLine}>
        <Upload
          action="/vue/taskMgr/task/import"
          accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          name="file"
          onSuccess={(res, file) => file.name}
          limit={3}
          className={styles.threeOne}
        >
          <Button>导入任务</Button>
        </Upload>
        <Button
          size="small"
          className={styles.threeTwo}
        >
          导出任务
        </Button>
      </div>
      <hr />
    </div>
  );
};

export default Header;
