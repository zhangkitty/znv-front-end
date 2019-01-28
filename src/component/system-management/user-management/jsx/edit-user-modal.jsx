import React from 'react';
import { Modal } from 'shineout';
import { Form, Input, TreeSelect, Row, Col, Button, } from 'antd';
import styles from './style.css';
import { closeEditUser, addUser, editUser, resetPwd, changeValue } from '../action';

class EditUserForm extends React.Component {
  onChange = (value) => {
    if (value === undefined || value === '' || value.split('.').length < 2) {
      return;
    }
    const tmpOrgId = parseInt(value.split('.')[0]);
    const tmpTopOrgId = parseInt(value.split('.')[1]);
    this.props.dispatch(changeValue('orgId', tmpOrgId));
    this.props.dispatch(changeValue('topOrgId', tmpTopOrgId));
    this.props.dispatch(changeValue('clickedId', value));
  }

  changeFullName = (e) => {
    this.props.dispatch(changeValue('fullName', e.target.value));
  }

  changePhone = (e) => {
    this.props.dispatch(changeValue('phone', e.target.value));
  }

  changeUserName = (e) => {
    this.props.dispatch(changeValue('userName', e.target.value));
  }

  changeEmail = (e) => {
    this.props.dispatch(changeValue('email', e.target.value));
  }

  changeRoleIds = (value) => {
    this.props.dispatch(changeValue('checkedRoleIds', value));
  }

  confirm() {
  }

  cancel() {
  }

  render() {
    const { dispatch, editUserModal: { visible, destroy }, topOrgId, orgId } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };

    return (
      this.props.editUserModal.destroy ? '' :
      <Modal
        title={this.props.title}
        className={styles.editUserModal}
        visible={this.props.editUserModal.visible}
        onClose={() => dispatch(closeEditUser())}
      >
        <Form onSubmit={() => {
          if (this.props.title === '新增用户') {
            if (this.props.clickedId === '' && this.props.orgId === '') {
              return;
            }
            if (this.props.orgId === '') {
              dispatch(changeValue('orgId', this.props.clickedId.split('.')[0]));
            }
            dispatch(addUser(this.props));
          } else {
            const orgId = this.props.clickedId.split('.')[0];
            dispatch(editUser(this.props, orgId));
          }
        }}
        >
          {getFieldDecorator('id')(<Input type="hidden" />)}
          <Row>
            <Col span={24}>
              <Form.Item {...formItemLayout} label="部门">
                {getFieldDecorator('orgId', {
                  initialValue: `${this.props.user.orgId === '' ? this.props.clickedId
                    : this.props.user.orgId + '.' + this.props.clickedId.split('.')[1] }`,
                  rules: [
                    { required: true, message: '请选择部门' },
                  ],
                })(<TreeSelect
                  style={{ width: 300 }}
                  treeData={this.props.editOrgTreeData}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  disabled={this.props.userId !== ''}
                  placeholder="请选择部门"
                  allowClear
                  treeDefaultExpandAll
                  onChange={this.onChange}
                />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...formItemLayout} label="姓名">
                {getFieldDecorator('fullName', {
                  initialValue: `${this.props.user.fullName}`,
                  rules: [
                    { required: true, message: '请输入姓名' },
                  ],
                })(<Input
                  style={{ width: 300 }}
                  placeholder="请输入姓名"
                  onChange={this.changeFullName}
                />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...formItemLayout} label="手机号">
                {getFieldDecorator('phone', {
                  initialValue: `${this.props.user.phone}`,
                  rules: [
                    { required: true, message: '请输入手机号' },
                  ],
                })(<Input
                  style={{ width: 300 }}
                  placeholder="请输入手机号"
                  onChange={this.changePhone}
                />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...formItemLayout} label="用户名">
                {getFieldDecorator('userName', {
                  initialValue: `${this.props.user.userName}`,
                  rules: [
                    { required: true, message: '请输入用户名' },
                  ],
                })(<Input
                  style={{ width: 300 }}
                  placeholder="请输入用户名"
                  disabled={this.props.userId !== ''}
                  onChange={this.changeUserName}
                />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...formItemLayout} label="邮箱">
                {getFieldDecorator('email', {
                  initialValue: `${this.props.user.email === null ? '' : this.props.user.email}`,
                })(<Input
                  style={{ width: 300 }}
                  placeholder="请输入邮箱"
                  onChange={this.changeEmail}
                />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...formItemLayout} label="密码">
                {(<span style={{ width: 360 }}>
                  { this.props.userId === '' ? '' :
                  <Button
                    type="primary"
                    onClick={() => {
                      if (this.props.phone === undefined || this.props.phone === '') {
                        dispatch(changeValue('phone', this.props.user.phone));
                      }
                      dispatch(changeValue('orgId', this.props.clickedId.split('.')[0]));
                      dispatch(resetPwd(this.props));
                    }}
                  >重置密码</Button> }
                  系统自动生成发送至手机</span>)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...formItemLayout} label="角色">
                {(<TreeSelect
                  style={{ width: 300 }}
                  value={this.props.checkedRoleIds}
                  treeData={this.props.roleTreeData}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="请选择角色"
                  allowClear
                  multiple
                  treeDefaultExpandAll
                  onChange={this.changeRoleIds}
                />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} offset={6}>
              <Button type="primary" htmlType="submit">保存</Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
const WrappedEditUserForm = Form.create({ name: 'editUrserForm' })(EditUserForm);
export default WrappedEditUserForm;