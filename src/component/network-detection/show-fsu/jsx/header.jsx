import React from 'react';
import { Input, Button, Select } from 'shineout';
import styles from './style.css';
import { search } from '../action';


const Header = (props) => {
  const {
    area, formData, status, type, dispatch,
  } = props;
  console.log(area);
  return (
    <div>
      <div className={styles.oneLine}>
        <div className={styles.divLine}>区 域:</div>
        <Select
          key={d => d.id}
          data={area}
          renderItem={v => v.name}
          className={styles.selectLine}
          onFilter={text => d => d.name.indexOf(text) >= 0}
          data-bind="formData.choosedArea"
        />
        <div className={styles.divLine}>FSU序列号:</div>
        <Input
          className={styles.selectLine}
          data-bind="formData.FSUNum"
        />
        <div className={styles.divLine}>FSUID:</div>
        <Input
          className={styles.selectLine}
          data-bind="formData.FSUID"
        />
      </div>
      <div className={styles.oneLine}>
        <div className={styles.divLine}>站址名称:</div>
        <Input
          className={styles.selectLine}
          data-bind="formData.siteName"
        />
        <div className={styles.divLine}>状 态:</div>
        <Select
          clearable
          className={styles.selectLine}
          renderItem={v => v.name}
          data={status}
          data-bind="formData.status"
        />
        <div className={styles.divLine}>类 型:</div>
        <Select
          clearable
          className={styles.selectLine}
          data={type}
          renderItem={v => v.name}
          data-bind="formData.type"
        />
        <Button
          className={styles.ButtonLine}
          onClick={() => dispatch(search(props))}
        >搜索
        </Button>
        <Button className={styles.ButtonLine}>导出</Button>
      </div>
      <hr style={{ marginBottom: 10 }} />
    </div>
  );
};

Header.propTypes = {

};

export default Header;
