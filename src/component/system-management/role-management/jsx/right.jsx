import React from 'react';
import { Tree, Checkbox } from 'shineout';
import { Button, Spin } from 'antd';
import styles from './style.css';
import { submit } from '../action';

const tmp = (props) => {
  const {
    dispatch,
    clickNode,
    right: {
      ready, menuTree, userTree, checkedMenuTree, checkedUserTree,
    },
  } = props;


  if (menuTree.length == 0) {
    return null;
  }
  if (userTree.length == 0) {
    return null;
  }

  if (ready === false) {
    return (
      <div style={{ textAlign: 'center', width: '100%', height: '100%' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (

    <div style={{ overflow: 'scroll', width: '100%' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row-reverse',
        marginRight: '40px',
      }}
      >
        <Button
          style={{
        }}
          disabled={clickNode.level !== 1}
          type="primary"
          onClick={() => dispatch(submit(props))}
        >提交
        </Button>
      </div>
      <div className={styles.right}>

        <div className={styles.menuTree}>
          <div style={{ fontSize: 14, marginBottom: 10 }}>配置菜单权限:</div>
          <Tree
            data={menuTree}
            keygen="id"
            line={false}
            renderItem={n => n.name}
            data-bind="right.checkedMenuTree"
          />
        </div>
        <div className={styles.userTree}>
          <div style={{ fontSize: 14, marginBottom: 10 }}>赋权用户:</div>
          <Tree
            data={userTree}
            keygen="id"
            line={false}
            defaultExpanded={[1]}
            renderItem={n => n.name}
            data-bind="right.checkedUserTree"
          />
        </div>
      </div>
    </div>


  );
};

export default tmp;
