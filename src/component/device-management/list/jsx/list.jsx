import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import Page from 'shein-lib/pagination';
import { changePage, changePageSize } from '../action';


const List = (props) => {
  const {
    dispatch,
    dataSource,
    searchLoading,
    total,
    formData: { pageNum, pageSize },
  } = props;
  const columns = [
    {
      key: 'assetCode',
      title: '资产ID',
      width: 100,
      dataIndex: 'assetCode',
      align: 'center',
    },
    {
      key: 'assetCode',
      title: '地址',
      width: 100,
      dataIndex: 'address',
      align: 'center',
    },
    {
      key: 'assetCode',
      title: '资产名称',
      width: 100,
      dataIndex: 'deviceName',
      align: 'center',
    },
    {
      key: 'assetCode',
      title: '省市区',
      width: 100,
      dataIndex: 'areaName',
      align: 'center',
    },
    {
      key: 'assetCode',
      title: '接收状态',
      width: 100,
      dataIndex: 'stateReceive',
      align: 'center',
      render: (text, record) => {
        const table = {
          1: '已接收',
          0: '未接收',
        };
        return table[record.stateReceive];
      },
    },
    {
      key: 'assetCode',
      title: '在线状态',
      align: 'center',
      width: 100,
      dataIndex: 'deviceOnlineStatus',
      render: (text, record) => {
        const table = {
          1: '在线',
          0: '离线',
        };
        return table[record.deviceOnlineStatus];
      },
    },
    {
      key: 'assetCode',
      title: '绑定设备',
      align: 'center',
      width: 100,
      // dataIndex: 'fsuOnlineStatus',
      render: (text, record) => {
        const table = {
          0: '离线',
          1: '在线',
          9: '未知',
        };
        return <Link to="/dashboard/ppppp">{table[record.fsuOnlineStatus]}</Link>;
      },
    },
    {
      key: 'assetCode',
      title: '操作',
      align: 'center',
      width: 100,
      render: (text, record) => {
        console.log(record);
        return <Link to={`/device-management/detail-tiancheng/${record.assetCode}`}>查看详情</Link>;
      },
    },
  ];
  return (
    <div>
      <Table
        bordered
        rowKey="assetCode"
        pagination={false}
        dataSource={dataSource}
        loading={searchLoading}
        columns={columns}
      />
      <Page
        total={total}
        current={pageNum}
        pageSize={pageSize}
        onChange={(current) => {
          dispatch(changePage(props, current));
        }}
        onShowSizeChange={(current, size) => {
          console.log(current);
          console.log(size);
          dispatch(changePageSize(props, current, size));
        }}

      />
    </div>
  );
};

List.propTypes = {
  searchLoading: PropTypes.bool.isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default List;
