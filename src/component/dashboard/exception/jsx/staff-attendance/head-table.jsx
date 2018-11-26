import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'shineout';

const HeadTable = (props) => {
  const { staffAttendance: { headTable: { dataSource } } } = props;
  const { node } = props;
  const len = node.id.split('.').length;
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
      render: d => `${Number((Math.round(d.workRate * 10000) / 100)).toFixed(2)}%`,
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
  const columns1 = [
    {
      title: '    ',
      render: 'dataTime',
    },
    {
      title: '是否出勤',
      render: d => (Number(d.workTime) > 0 ? '是' : '否'),

    },
    {
      title: '工作时长',
      render: 'workTime',
    },
    {
      title: '工作路程',
      render: 'workDistance',
    },
  ];
  return (
    <div>
      <Table
        keygen="id"
        data={dataSource}
        columns={len > 3 ? columns1 : columns}
      />

    </div>
  );
};

export default HeadTable;
