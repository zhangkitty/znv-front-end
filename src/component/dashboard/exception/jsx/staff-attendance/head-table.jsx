import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'shineout';

const HeadTable = (props) => {
  const { staffAttendance: { headTable: { dataSource } } } = props;
  const columns = [
    {
      title: '    ',
      render: 'dataTime',
    },
    {
      title: '总人数',
      render: 'totalNum',
    },
    {
      title: '出勤人数',
      render: 'workNum',
    },
    {
      title: '出勤率',
      render: d => `${Number(d.workRate * 100).toFixed(2)}%`,
    },
    {
      title: '平均工时/h',
      render: 'workTime',
    },
    {
      title: '工作路程/km',
      render: 'workDistance',
    },
  ];
  return (
    <div>
      <Table
        keygen="id"
        data={dataSource}
        columns={columns}
      />

    </div>
  );
};

export default HeadTable;
