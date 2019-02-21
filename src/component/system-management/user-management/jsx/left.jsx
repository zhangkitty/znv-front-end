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
    const {
      orgTree, dispatch, title, orgName, parentOrgId,
    } = this.props;

    return (
      <div className={styles.left}>
        <div>
          <span className={styles.leftSpan}>部门列表</span>
          <span className={styles.rightSpan}>
            <a
              className={styles.linkButton}
              onClick={() => {
                if (this.props.clickedId === null || this.props.clickedId === '') {
                  dispatch(changeValue('parentOrgId', ''));
                } else {
                  dispatch(changeValue('parentOrgId', this.props.clickedId));
                }
                dispatch(changeValue('title', '新增部门'));
                dispatch(changeValue('orgName', ''));
                dispatch(openEditOrg(this.props));
              }}
            >添加</a>
            <a
              className={styles.linkButton}
              disabled={this.props.clickedId === '' || this.props.clickedOrgLevel === 1}
              onClick={() => {
                dispatch(changeValue('title', '编辑部门'));

                const parentId = `${this.props.node.parentId}.${this.props.node.topId}`;
                dispatch(changeValue('parentOrgId', parentId));
                if (this.props.orgName === '') {
                  dispatch(changeValue('orgName', this.props.node.name));
                }
                dispatch(openEditOrg(this.props));
              }}
            >编辑</a>
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

            const orgId = id.split('.')[0];
            dispatch(getUsers(this.props, orgId));
          }}
        />
      </div>
    );
  }
}
