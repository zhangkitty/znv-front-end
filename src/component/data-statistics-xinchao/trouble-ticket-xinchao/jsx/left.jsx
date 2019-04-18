import React from 'react';
import styles from '../style.css';
import { Tree } from 'shineout';

const Left = (props) => {
  const { dept, clickId } = props;
  return (
    <div className={styles.left}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: 10,
      }}
      >
        <span>部门列表</span>
      </div>


      <Tree
        data={dept}
        keygen="value"
        line={false}
        defaultExpanded={[11000008]}
        renderItem={v => <span className={v.value === clickId ? styles.leftItem : null}>{v.title}</span>}
        onClick={(node, value) => {
          console.log(node);
          console.log(value);
        }}
      />

    </div>
  );
};

export default Left;
