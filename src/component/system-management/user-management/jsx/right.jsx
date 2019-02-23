import React from 'react';
import Page from 'shein-lib/pagination';
import EditUserModal from './edit-user-modal';
import { Button } from 'shineout';
import { Table, Divider, Popconfirm, Upload, Icon, message, Select, Input } from 'antd';
import styles from '../style.css';
import {
  changeValue,
  openEditUser,
  deleteUser,
  chgUserStatus,
  getUserDetail,
  clearUserDetail,
  changePage,
  changePageSize,
  getUsers,
} from '../action';

export default class RightUserList extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    fileList: [],
    uploading: false,
  }

  render() {
    const {
        dataSource, dispatch, total, page, pageSize,
        topOrgId, orgId, userId, phone, queryUserFormData,
      } = this.props;

    const uploadProps = {
      name: 'template',
      accept: '.xls,.xlsx',
      action: `/srm/user/batch/import?token=${localStorage.getItem('token')}`,
      showUploadList: false,
      onChange(info) {
        if (info.file.status === 'done') {
          if (info.file.response.success === true) {
            let content = `${info.file.name} 导入完成(共${info.file.response.data.total}条数据：
                           成功${info.file.response.data.success}条，失败${info.file.response.data.failed}条)。`;
            message.success(content);
            if (info.file.response.data.failed > 0) {
              const size = `${info.file.response.data.failedList.length}`;
              for (var i=0; i< size; i++) {
                content = `${content}<br>第${info.file.response.data.failedList[i].index}条失败，
                           原因：${info.file.response.data.failedList[i].reason}`;
              }
              const win = window.open('about:blank');
              win.document.write(content);
            }
          } else {
            message.error(`${info.file.response.msg}`);
          }
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 导入失败。`);
        }
      },
    };

    const columns = [
      {
        title: '部门',
        dataIndex: 'orgName',
      },
      {
        title: '姓名',
        dataIndex: 'fullName',
      },
      {
        title: '手机号码',
        dataIndex: 'phone',
      },
      {
        title: '用户名',
        dataIndex: 'userName',
      },
      {
        title: '状态',
        align: 'center',
        dataIndex: 'statusName',
      },
      {
        title: '操作',
        align: 'center',
        dataIndex: 'statusCode',
        width: 200,
        render: (text, record) => {
          const table = {
            0: '停用',
            1: '启用',
          };
          const chgStatusTable = {
            0: '确认要停用该用户吗？',
            1: '确认要重新启用该用户吗？',
          };
          return (
            <span>
              <a onClick={() => {
                dispatch(changeValue('title', '编辑用户'));
                dispatch(changeValue('userId', record.userId));
                const { userId } = record;
                dispatch(changeValue('user', dispatch(getUserDetail(this.props, userId))));
                dispatch(openEditUser(this.props));
              }}
              >编辑
              </a>
              <Divider type="vertical" />
              <Popconfirm
                title={chgStatusTable[record.statusCode]}
                onConfirm={() => {
                  const { userId, statusCode } = record;
                  const status = statusCode === 0 ? 1 : 0;
                  dispatch(chgUserStatus(this.props, userId, status));
                }}
                okText="确认"
                cancelText="取消"
              >
                <a href="#">{table[record.statusCode]}</a>
              </Popconfirm>
              <Divider type="vertical" />
              <Popconfirm
                title="确认要删除该用户吗?"
                onConfirm={() => {
                    const { userId } = record;
                    dispatch(deleteUser(this.props, userId));
                }}
                onCancel={() => {}}
                okText="确认"
                cancelText="取消"
              >
                <a href="#">删除</a>
              </Popconfirm>
            </span>);
        },
      },
    ];

    return (
      <div className={styles.right}>
        <div className={styles.rightDiv}>
          <Button
            type="primary"
            disabled={this.props.clickedId === ''}
            onClick={() => {
              dispatch(changeValue('title', '新增用户'));
              dispatch(changeValue('userId', ''));
              dispatch(clearUserDetail());
              dispatch(openEditUser(this.props));
            }}
          >添加
          </Button>
          <Button
            type="primary"
            onClick={() => {
              window.location.href = './template/batch_add_user_template.xlsx';
            }}
          >下载模板
          </Button>
          <Upload {...uploadProps} style={{ marginLeft: 10 }}>
            <Button>
              <Icon type="upload" />批量导入
            </Button>
          </Upload>
          <EditUserModal {...this.props} />
        </div>
        <br />
        <div className={styles.flexBox} style={{ paddingTop: 0 }}>
          <div className={styles.all}>
            <span className={styles.one}>姓名</span>
            <Input data-bind="queryUserFormData.fullName" className={styles.two}>
            </Input>
          </div>
          <div className={styles.all}>
            <span className={styles.one}>手机号码</span>
            <Input className={styles.two} data-bind="queryUserFormData.phone" />
          </div>
          <div className={styles.all}>
            <span className={styles.one}>状态</span>
            <Select className={styles.two} data-bind="queryUserFormData.status">
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="0">正常</Select.Option>
              <Select.Option value="1">停用</Select.Option>
            </Select>
          </div>
          <div className={styles.all}>
            <span className={styles.one} />
            <Button
              className={styles.two}
              style={{ width: 80 }}
              type="primary"
              onClick={() => {
                let tmpOrgId = '';
                let tmpTopOrgId = '';
                if (this.props.clickedId !== '') {
                  tmpOrgId = this.props.clickedId.split('.')[0];
                  tmpTopOrgId = this.props.clickedId.split('.')[1];
                }
                dispatch(getUsers(this.props, tmpOrgId, tmpTopOrgId));
              }}
            >查询
            </Button>
          </div>
        </div>
        <Table
          bordered
          rowKey="userId"
          pagination={false}
          columns={columns}
          dataSource={dataSource}
        />
        <Page
          total={total}
          current={page}
          pageSize={pageSize}
          onChange={(current) => {
            const orgId = this.props.clickedId.split('.')[0];
            const topOrgId = this.props.clickedId.split('.')[1];
            dispatch(changePage(this.props, current, orgId, topOrgId));
          }}
          onShowSizeChange={(current, size) => {
            const orgId = this.props.clickedId.split('.')[0];
            const topOrgId = this.props.clickedId.split('.')[1];
            dispatch(changePageSize(this.props, current, size, orgId, topOrgId));
          }}
        />
      </div>
    );
  }
}
