import React from 'react';
import styles from '../style.css';
import { Tree } from 'shineout';
import { changeDept } from '../action';

const Left = (props) => {
  const { dept, clickId, dispatch } = props;
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
        renderItem={v => <span className={v.orgId === clickId ? styles.leftItem : null}>{v.title}</span>}
        onClick={(node, value) => {
          dispatch(changeDept(node, value));
        }}
      />

    </div>
  );
};

export default Left;
