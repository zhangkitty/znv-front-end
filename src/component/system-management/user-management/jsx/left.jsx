import React from 'react';
import EditOrgModal from './edit-org-modal';
import { Tree, Button } from 'shineout';
import styles from '../style.css';
import { changeValue, getUsers, openEditOrg } from '../action';

export default class LeftTree extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { orgTree, dispatch, title, orgName, parentOrgId } = this.props;

    return (
      <div className={styles.left}>
        <div>
          <span className={styles.leftSpan}>部门列表</span>
          <span className={styles.rightSpan}>
            <Button
              type="link"
              style={{ marginLeft: -12 }}
              onClick={() => {
                // 未点击左侧树节点，或点击公司级别节点时，新增部门
                if (this.props.clickedId === '' || this.props.clickedOrgLevel === 1) {
                  dispatch(changeValue('title', '新增部门'));
                  dispatch(changeValue('parentOrgId', ''));
                  dispatch(changeValue('orgName', ''));
                } else {
                  dispatch(changeValue('title', '编辑部门'));
                }
                dispatch(openEditOrg(this.props));
            }}>添加/编辑</Button>
          </span>
          <EditOrgModal {...this.props} />
        </div>
        <Tree
          data={orgTree}
          keygen="id"
          defaultExpanded={['0']}
          renderItem={v => (<span className={this.props.clickedId === v.id ? styles.leftItem : null}>{v.name}</span>)}
          line={false}
          onClick={(node, id) => {
            dispatch(changeValue('clickedId', id));
            dispatch(changeValue('clickedOrgLevel', node.level));
            dispatch(changeValue('node', node));
            dispatch(changeValue('orgName', node.name));

            const parentId = `${ node.parentId }.${ node.topId }`;
            dispatch(changeValue('parentOrgId', parentId));

            const orgId = id.split('.')[0];
            dispatch(getUsers(this.props, orgId));
          }}
        />
      </div>
    );
  }
}
