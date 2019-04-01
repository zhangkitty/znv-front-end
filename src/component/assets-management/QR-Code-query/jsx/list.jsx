import React from 'react';
import { Table } from 'antd';

const tmp = (props) => {
  const { dataSource } = props;
  const columns = [{
    title: '工厂名称',
    dataIndex: 'companyName',
    key: 'companyName',
    align: 'center',
  },
  {
    title: '生成日期',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
  },
  {
    title: '生成数量',
    dataIndex: 'createNum',
    key: 'createNum',
    align: 'center',
  },
  {
    title: '设备编码范围',
    dataIndex: 'deviceIdRange',
    key: 'deviceIdRange',
    align: 'center',
  },
  {
    title: '操作人',
    dataIndex: 'trueName',
    key: 'trueName',
    align: 'center',
  },
  ];
  return (
    <div style={{ marginTop: 10 }}>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default tmp;
