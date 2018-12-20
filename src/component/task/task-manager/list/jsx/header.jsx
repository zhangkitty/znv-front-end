import React from 'react';
import { Input, Select, DatePicker, Button, Upload } from 'shineout';
import styles from './style.css';
import { search, changeFour, changeProvince, changeCity, changeTwoFive, out } from '../action';

const Header = (props) => {
  const {
    formData,
    areaList,
    deviceTypeList,
    oneThree,
    oneFive,
    oneSix,
    twoOne,
    twoThree,
    twoFour,
    dispatch,
  } = props;
  return (
    <div>
      <div className={styles.oneLine} >
        <Input
          className={styles.oneOne}
          placeholder="创建人"
          data-bind="formData.oneOne"
        />
        <Input
          className={styles.oneTwo}
          placeholder="处理人"
          data-bind="formData.oneTwo"
        />
        <Select
          clearable
          className={styles.oneThree}
          placeholder="调度类型"
          data-bind="formData.oneThree"
          data={oneThree}
          renderItem={d => d.dictNote}
        />
        <Select
          clearable
          className={styles.oneFour}
          placeholder="设备类型"
          data={deviceTypeList}
          renderItem={d => d.name}
          onChange={d => dispatch(changeFour(d))}
        />
        <Select
          clearable
          className={styles.oneFive}
          placeholder="故障类型"
          data={oneFive}
          renderItem={d => d.name}
          data-bind="formData.oneFive"
        />
        <Select
          clearable
          className={styles.oneSix}
          placeholder="任务级别"
          data={oneSix}
          renderItem={d => d.dictNote}
          data-bind="formData.oneSix"
        />
      </div>
      <div className={styles.twoLine}>
        <Select
          clearable
          className={styles.twoOne}
          placeholder="状态"
          data={twoOne}
          renderItem={d => d.dictNote}
          data-bind="formData.twoOne"
        />
        <Select
          clearable
          className={styles.twoTwo}
          placeholder="请选择省"
          data={areaList}
          renderItem={d => d.name}
          onChange={d => dispatch(changeProvince(d))}
        />
        <Select
          clearable
          className={styles.twoThree}
          placeholder="请选择市"
          data={twoThree}
          renderItem={d => d.name}
          onChange={d => dispatch(changeCity(d))}
        />
        <Select
          clearable
          className={styles.twoFour}
          placeholder="请选择区"
          data={twoFour}
          renderItem={d => d.name}
          data-bind="formData.twoFour"
        />
        <DatePicker
          className={styles.twoFive}
          value={formData.twoFive}
          range
          onChange={d => dispatch(changeTwoFive(d))}
        />
        <Button
          className={styles.six}

          onClick={d => dispatch(search(props))}
        >
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
          onClick={() => dispatch(out(props))}
        >
          导出任务
        </Button>
      </div>
      <hr />
    </div>
  );
};

export default Header;
