import React from 'react';
import { Table } from 'shineout';

const AttendanceTable = (props) => {
  const columns = [
    {
      title: '操作时间',
    },
    {
      title: '操作类型',
    },
    {
      title: '打卡结果',
    },
  ];

  return (
    <Table
      keygen="id"
      width={1500}
      columns={columns}
      data={[]}
    />
  );
};

export default AttendanceTable;
