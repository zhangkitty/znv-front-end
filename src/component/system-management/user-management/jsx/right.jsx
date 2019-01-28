import React from 'react';
import Page from 'shein-lib/pagination';
import EditUserModal from './edit-user-modal';
import { Button } from 'shineout';
import { Table, Divider, Popconfirm, Upload, Icon, message } from 'antd';
import styles from '../style.css';
import {
  changeValue,
  getRoleTree,
  openEditUser,
  deleteUser,
  chgUserStatus,
  getUserDetail,
  clearUserDetail,
  changePage,
  changePageSize,
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
      topOrgId, orgId, userId, phone,
    } = this.props;

    const uploadProps = {
      name: 'template',
      accept: '.xls,.xlsx',
      action: '/srm/user/batch/import?token='+this.props.token,
      showUploadList : false,
      onChange(info) {
        if (info.file.status === 'done') {
          if (info.file.response.success === true) {
            message.success(`${info.file.name} ����ɹ���`);
          } else {
            message.error(`${info.file.response.msg}`);
          }
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} ����ʧ�ܡ�`);
        }
      },
    };

    const columns = [
      {
        title: '����',
        dataIndex: 'orgName',
      },
      {
        title: '����',
        dataIndex: 'fullName',
      },
      {
        title: '�ֻ�����',
        dataIndex: 'phone',
      },
      {
        title: '�û���',
        dataIndex: 'userName',
      },
      {
        title: '״̬',
        align: 'center',
        dataIndex: 'statusName',
      },
      {
        title: '����',
        align: 'center',
        dataIndex: 'statusCode',
        width: 200,
        render: (text, record) => {
          const table = {
            0: 'ͣ��',
            1: '����',
          };
          const chgStatusTable = {
            0: 'ȷ��Ҫͣ�ø��û���',
            1: 'ȷ��Ҫ�������ø��û���',
          };
          return (
            <span>
              <a onClick={() => {
                dispatch(changeValue('title', '�༭�û�'));
                dispatch(getRoleTree(this.props));
                dispatch(changeValue('userId', record.userId));
                const { userId } = record;
                dispatch(changeValue('user', dispatch(getUserDetail(this.props, userId))));
                dispatch(openEditUser(this.props));
              }}
              >�༭
              </a>
              <Divider type="vertical" />
              <Popconfirm
                title={chgStatusTable[record.statusCode]}
                onConfirm={() => {
                  const { userId, statusCode } = record;
                  const status = statusCode === 0 ? 1 : 0;
                  const orgId = this.props.clickedId.split('.')[0];
                  dispatch(chgUserStatus(this.props, userId, status, orgId));
                }}
                okText="ȷ��"
                cancelText="ȡ��"
              >
                <a href="#">{table[record.statusCode]}</a>
              </Popconfirm>
              <Divider type="vertical" />
              <Popconfirm
                title="ȷ��Ҫɾ�����û���?"
                onConfirm={() => {
                  const { userId } = record;
                  const orgId = this.props.clickedId.split('.')[0];
                  dispatch(deleteUser(this.props, userId, orgId));
                }}
                onCancel={() => {}}
                okText="ȷ��"
                cancelText="ȡ��"
              >
                <a href="#">ɾ��</a>
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
              dispatch(changeValue('title', '�����û�'));
              dispatch(changeValue('checkedOrgId', this.props.clickedId));
              dispatch(changeValue('orgId', this.props.clickedId.split('.')[0]));
              dispatch(changeValue('topOrgId', this.props.clickedId.split('.')[1]));
              dispatch(changeValue('userId', ''));
              dispatch(clearUserDetail());
              dispatch(getRoleTree(this.props));
              dispatch(openEditUser(this.props));
            }}
          >���</Button>
          <Button
            type="primary"
            onClick={() => {
               window.location.href = './template/batch_add_user_template.xlsx';
            }}
          >����ģ��
          </Button>
          <Upload {...uploadProps} style={{marginLeft: 10}}>
            <Button>
              <Icon type="upload" />��������
            </Button>
          </Upload>
          <EditUserModal {...this.props} />
        </div>
        <br />
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
            dispatch(changePage(this.props, current, orgId));
          }}
          onShowSizeChange={(current, size) => {
            const orgId = this.props.clickedId.split('.')[0];
            dispatch(changePageSize(this.props, current, size, orgId));
          }}
        />
      </div>
    );
  }
}
