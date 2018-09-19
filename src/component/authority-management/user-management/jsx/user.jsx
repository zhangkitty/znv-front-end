import React from 'react';
import { Table, Button } from 'antd';
import Page from 'shein-lib/pagination';
import { changePage, changePageSize, changeValue } from '../action';
import styles from '../style.css';

const User = (props) => {
  const {
    dataSource, total, page, pageSize, dispatch,
  } = props;
  const columns = [
    {
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '电话',
      dataIndex: 'telephone',
      key: 'telephone',
    },
    {
      title: '邮箱',
      dataIndex: 'mail',
      key: 'mail',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div>
      <div className={styles.addUser}>
        <Button
          onClick={() => dispatch(changeValue('addUserVisible', true))}
        >
          添加用户
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
      <Page
        total={total}
        onChange={(page, pageSize) => {
          dispatch(changeValue('page', page));
          dispatch(changePage(Object.assign({}, props, {
          page,
          pageSize,
        })));
}}
        onShowSizeChange={(current, size) => {
            dispatch(changeValue('pageSize', size));
            dispatch(changePageSize(Object.assign({}, props, {
              page: current,
              pageSize: size,
            })));
        }}
        current={page}
        pageSize={pageSize}
      />
    </div>
  );
};

export default User;
