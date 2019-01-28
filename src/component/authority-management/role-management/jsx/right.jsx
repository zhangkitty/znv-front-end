import React from 'react';
import { Tree, Checkbox } from 'shineout';
import { Button, Spin } from 'antd';
import styles from './style.css';

const tmp = (props) => {
  const { right: { ready, menuTree, userTree } } = props;


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
  console.log(menuTree);
  console.log(userTree);

  return (

    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'row-reverse',
      }}
      >
        <Button
          style={{
        }}
          type="primary"
        >提交
        </Button>
      </div>
      <div className={styles.right}>

        <div className={styles.menuTree}>
          <div style={{ fontSize: 14, marginBottom: 10 }}>配置菜单权限:</div>
          <Tree
            data={menuTree}
            keygen="id"
            defaultExpanded={[1]}
            line={false}
            renderItem={n => n.name}
            onChange={value => console.log(value)}
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
            onChange={value => console.log(value)}
          />
        </div>
      </div>
    </div>


  );
};

export default tmp;
