import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'shineout';

const HeadTable = (props) => {
  const columns = [
    {
      title: '',
    },
    {
      title: '总人数',
    },
    {
      title: '出勤人数',
    },
    {
      title: '出勤率',
    },
    {
      title: '平均工时/h',
    },
    {
      title: '工作路程/km',
    },
  ];
  return (
    <div>
      <Table
        keygen="id"
        data={[]}
        columns={columns}
      />

    </div>
  );
};

export default HeadTable;
