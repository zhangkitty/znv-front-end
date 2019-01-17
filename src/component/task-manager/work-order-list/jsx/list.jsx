import React from 'react';
import Page from 'shein-lib/pagination';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { changeSelect, changePage, changePageSize } from '../action';

const List = (props) => {
  const {
    dataSource,
    tableLoading,
    dispatch,
    total,
    selectedRowKeys,
    formData: {
      pageNum,
      pageSize,
    },
  } = props;
  console.log(dataSource.length);
  const columns = [
    {
      title: '设备名称',
      width: 100,
      dataIndex: 'name',
    },
    {
      title: '城市',
      width: 100,
      dataIndex: 'areaName',
    },
    {
      title: '更新时间',
      width: 100,
      dataIndex: 'updateTime',
    },
    {
      title: '工单类型',
      width: 100,
      dataIndex: 'woType',
    },
    {
      title: '工单状态',
      width: 100,
      dataIndex: 'orderState',
    },
    {
      title: '处理人',
      width: 100,
      dataIndex: 'handleName',
    },
    {
      title: '创建时间',
      width: 100,
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      width: 100,
      render: (text, record) => {
        console.log(record);
        return <Link to={`/task-manager/detail-tiancheng/${record.taskId}`}>查看详情</Link>;
      },
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: v => dispatch(changeSelect(v)),
  };
  return (
    <div>
      <Table
        bordered
        rowKey="taskId"
        rowSelection={rowSelection}
        dataSource={dataSource}
        loading={tableLoading}
        columns={columns}
        pagination={false}
      />
      <Page
        total={total}
        current={pageNum}
        pageSize={pageSize}
        onChange={(current) => {
          dispatch(changePage(props, current));
        }}
        onShowSizeChange={(current, size) => {
          dispatch(changePageSize(props, current, size));
        }}

      />
    </div>
  );
};

List.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
};

export default List;
