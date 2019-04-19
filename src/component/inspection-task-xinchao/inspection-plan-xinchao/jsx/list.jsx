import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const List = (props) => {
  const {
    table: {
      dataSouce,
      loading,
    },
  } = props;
  const columns = [
    {
      title: '入库单号',
      dataIndex: 'inStorageNo',
      width: 100,
    },
    {
      title: '生产制单',
      dataIndex: 'produceOrderId',
      width: 100,
    },
    {
      title: '生产组',
      dataIndex: 'productionGroup',
      width: 100,
    },
    {
      title: '入库单号',
      dataIndex: 'inStorageNo',
      width: 100,
    },
    {
      title: '生产制单',
      dataIndex: 'produceOrderId',
      width: 100,
    },
    {
      title: '生产组',
      dataIndex: 'productionGroup',
      width: 100,
    },
  ];
  return (
    <div>
      <Table
        bordered
        rowKey="id"
        dataSource={dataSouce}
        loading={loading}
        columns={columns}
      />
    </div>
  );
};


export default List;
