import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const List = (props) => {
  const columns = [
    {
      title: '新增故障工单数',
      dataIndex: 'inStorageNo',
      textAlign: 'center',
    },
    {
      title: '未关闭数',
      dataIndex: 'produceOrderId',
      textAlign: 'center',
    },
    {
      title: '关闭数',
      dataIndex: 'productionGroup',
      textAlign: 'center',
    },
    {
      title: '超时数',
      dataIndex: 'productionGroup',
      textAlign: 'center',
    },
    {
      title: '平均处理时长(h)',
      dataIndex: 'productionGroup',
      textAlign: 'center',
    },
    {
      title: '故障率',
      dataIndex: 'productionGroup',
      textAlign: 'center',
    },
  ];
  return (
    <div>
      <Table
        bordered
        rowKey="id"
        dataSource={[]}
        loading={false}
        columns={columns}
      />
    </div>
  );
};


export default List;
