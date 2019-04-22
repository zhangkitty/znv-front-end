import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { Link } from 'react-router-dom';


const List = (props) => {
  const {
    dataSource,
  } = props;
  const columns = [
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      align: 'center',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      align: 'center',
    },
    {
      title: '质检人员',
      dataIndex: 'staffName',
      align: 'center',
    },
    {
      title: '项目数',
      dataIndex: 'itemCount',
      align: 'center',
    },
    {
      title: '终端数',
      dataIndex: 'deviceCount',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: '操作',
      render: v => (
        <div>
          <Link to="">查看</Link>
          <Link to="">编辑</Link>
        </div>
      ),
    },
  ];
  return (
    <div
      style={{ marginTop: 10, marginRight: 10 }}
    >
      <Table
        bordered
        rowKey="id"
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};


export default List;
