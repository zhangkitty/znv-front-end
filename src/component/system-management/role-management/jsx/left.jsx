import React from 'react';
import { Tree, Button } from 'shineout';
import { Popconfirm } from 'antd';
import styles from './style.css';
import { changeValue, openAddRoleModal, openModifyRoleModal, deleteRole, getPermissionAndUserDetail, getCompanyDetail } from '../action';
import AddRole from './addRole';
import ModifyRole from './modifyRole';

const tmp = (props) => {
  console.log(props);
  const { clickNode, dispatch, left: { tree } } = props;

  return (
    <div className={styles.left}>
      <div style={{
 display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: 10,
}}
      >
        <span>角色列表</span>
        {
          clickNode.level === 0 &&
          <Button
            type="link"
            style={{ padding: 0, marginLeft: 0, paddingRight: 10 }}
            onClick={() => dispatch(openAddRoleModal(props))}
          >
            新增角色
          </Button>
        }
        {
          clickNode.level === 1 &&
          <div>
            <Button
              type="link"
              style={{ padding: 0 }}
              onClick={() => dispatch(openModifyRoleModal(props))}
            >修改
            </Button>
            <span />
            <Popconfirm title="是否要删除这个角色?" onConfirm={() => dispatch(deleteRole(props))} onCancel={() => console.log(2)} okText="Yes" cancelText="No">
              <Button type="link" style={{ padding: 0, marginLeft: 0, paddingRight: 10 }}>删除</Button>
            </Popconfirm>
          </div>
        }

      </div>
      <div>
        <Tree
          data={tree}
          defaultExpanded={[]}
          line={false}
          keygen="id"
          renderItem={v => (<span className={clickNode.id === v.id ? styles.leftItem : null}>{v.name}</span>)}
          onClick={(node, id) => {
            dispatch(changeValue('clickNode', node));
            if (node.level === 1) {
              dispatch(getPermissionAndUserDetail(id));
            }
            if (node.level === 0) {
              dispatch(getCompanyDetail());
            }
          }}
        />
      </div>
      <AddRole {...props} />
      <ModifyRole {...props} />
    </div>
  );
};

export default tmp;
