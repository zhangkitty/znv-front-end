import React from 'react';
import { Modal } from 'shineout';
import {
  Form, Input, TreeSelect, Row, Col, Button,
} from 'antd';
import styles from './style.css';
import { closeEditOrg, addOrg, editOrg, deleteOrg, changeValue } from '../action';

class EditOrgForm extends React.Component {
  onChange = (value) => {
    if (value === undefined || value === '') {
      return;
    }
    this.props.dispatch(changeValue('parentOrgId', value));
  }

  changeOrgName = (e) => {
    this.props.dispatch(changeValue('orgName', e.target.value));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.title === '编辑部门') {
          this.props.dispatch(editOrg(this.props));
        } else {
          this.props.dispatch(addOrg(this.props));
        }
      }
    });
  }

  render() {
    const { dispatch, editOrgModal: { visible, destroy } } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 11 },
      wrapperCol: { span: 13 },
    };

    return (
      this.props.editOrgModal.destroy ?  '' :
      <Modal
        title={this.props.title}
        className={styles.editOrgModal}
        visible={this.props.editOrgModal.visible}
        onClose={() => dispatch(closeEditOrg())}
      >
        <Form onSubmit={e => this.handleSubmit(e)} >
          {getFieldDecorator('id')(<Input type="hidden" />)}
          <Row>
            <Col span={13}>
              <Form.Item {...formItemLayout} label="上级部门">
                {getFieldDecorator('parentOrgId', {
                  initialValue: `${this.props.parentOrgId}`,
                  rules: [
                    { required: true, message: '请选择上级部门' },
                  ],
                })(<TreeSelect
                  style={{ width: 260 }}
                  treeData={this.props.editOrgTreeData}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="请选择上级部门"
                  disabled={this.props.clickedId !== ''}
                  allowClear
                  treeDefaultExpandAll
                  onChange={this.onChange}
                />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={13}>
              <Form.Item {...formItemLayout} label="部门名称">
                {getFieldDecorator('orgName', {
                  initialValue: `${this.props.orgName}`,
                  rules: [
                    { required: true, message: '请输入部门名称' },
                  ],
                })(<Input
                  style={{ width: 260 }}
                  placeholder="请输入部门名称"
                  maxLength={20}
                  onBlur={this.changeOrgName}
                />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={13} offset={6}>
              <Button
                disabled={this.props.title === '新增部门'}
                onClick={() => {
                  dispatch(changeValue('clickedId', ''));
                  dispatch(deleteOrg(this.props));
                }}
              >删除
              </Button>
              <Button type="primary" htmlType="submit">保存</Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
const WrappedEditOrgForm = Form.create({ name: 'editOrgForm' })(EditOrgForm);
export default WrappedEditOrgForm;
