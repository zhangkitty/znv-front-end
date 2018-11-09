import React from 'react';
import { Table } from 'shineout';

const AttendanceTable = (props) => {
  const { dataSource } = props;
  const columns = [
    {
      title: '上班卡/下班卡',
      render: 'operation',
    },
    {
      title: '打卡时间',
      render: 'operationTime',
    },
    {
      title: '操作类型',
      render: 'operationType',
    },
    {
      title: '打卡地址',
      render: 'operationAddress',
    },
  ];

  return (
    <Table
      keygen="id"
      width={1500}
      columns={columns}
      data={dataSource}
    />
  );
};

export default AttendanceTable;
