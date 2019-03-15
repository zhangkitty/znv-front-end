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
      key: 'id',
      title: '监控单元ID',
      width: 100,
      dataIndex: 'id',
      align: 'center',
    },
    {
      key: 'areaName',
      title: '城市',
      width: 100,
      dataIndex: 'areaName',
      align: 'center',
    },
    {
      key: 'equipmentType',
      title: '监控单元型号',
      width: 100,
      dataIndex: 'equipmentType',
      align: 'center',
    },
    {
      key: 'stateOnlineDesc',
      title: '在线状态',
      width: 100,
      dataIndex: 'stateOnlineDesc',
      align: 'center',
    },
    {
      key: 'time',
      title: '更新时间',
      width: 100,
      dataIndex: 'time',
      align: 'center',
    },
    {
      key: 'accessNetTime',
      title: '注册时间',
      width: 100,
      dataIndex: 'accessNetTime',
      align: 'center',
    },
    {
      key: 'name',
      title: '被监控设备',
      align: 'center',
      width: 100,
      dataIndex: 'name',
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
