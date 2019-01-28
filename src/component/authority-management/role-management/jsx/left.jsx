import React from 'react';
import { Tree, Button } from 'shineout';
import { Popconfirm } from 'antd';
import styles from './style.css';
import { changeValue, openAddRoleModal, openModifyRoleModal, deleteRole, getRoleDetail } from '../action';
import AddRole from './addRole';
import ModifyRole from './modifyRole';

const tmp = (props) => {
  console.log(props);
  const { clickedId, dispatch, left: { tree } } = props;

  return (
    <div className={styles.left}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>角色列表</span>
        {
          clickedId === 1 &&
          <Button
            type="link"
            style={{ padding: 0, marginLeft: 0, paddingRight: 10 }}
            onClick={() => dispatch(openAddRoleModal(props))}
          >
            新增角色
          </Button>
        }
        {
          clickedId !== 1 &&
          <div>
            <Button
              type="link"
              style={{ padding: 0 }}
              onClick={() => dispatch(openModifyRoleModal(props))}
            >修改
            </Button>
            <span>\</span>
            <Popconfirm title="是否要删除这个角色?" onConfirm={() => dispatch(deleteRole(props))} onCancel={() => console.log(2)} okText="Yes" cancelText="No">
              <Button type="link" style={{ padding: 0, marginLeft: 0, paddingRight: 10 }}>删除</Button>
            </Popconfirm>,


          </div>
        }

      </div>
      <div>
        <Tree
          data={tree}
          defaultExpanded={[1]}
          line={false}
          keygen="id"
          renderItem={v => (<span className={clickedId === v.id ? styles.leftItem : null}>{v.name}</span>)}
          onClick={(node, id) => {
            dispatch(changeValue('clickedId', id));
            dispatch(getRoleDetail(id));
          }}
        />
      </div>
      <AddRole {...props} />
      <ModifyRole {...props} />
    </div>
  );
};

export default tmp;
