import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const List = (props) => {
  const {
    list,
    dataLoading,
  } = props;
  const columns = [
    {
      title: '资产ID',
      width: 100,
    },
    {
      title: '资产名称',
      width: 100,
    },
    {
      title: '省市区',
      width: 100,
    },
    {
      title: '接收状态',
      width: 100,
    },
    {
      title: '在线状态',
      width: 100,
    },
    {
      title: '绑定设备',
      width: 100,
    },
    {
      title: '操作',
      width: 100,
    },
  ];
  return (
    <div>
      <Table
        bordered
        rowKey="id"
        dataSource={list}
        loading={dataLoading}
        columns={columns}
      />
    </div>
  );
};

List.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default List;
