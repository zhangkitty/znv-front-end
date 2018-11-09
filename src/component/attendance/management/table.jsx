import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';


import { Table, Button } from 'shineout';

const AttendanceTable = (props) => {
  console.log(props);
  const { dispatch } = props;

  const columns = [
    { title: '运维人员', render: 'id' },
    { title: '城市', render: d => `${d.firstName} ${d.lastName}` },
    { title: '团队', render: 'country' },
    { title: '日期', render: 'position' },
    { title: '上班卡', render: 'office' },
    { title: '下班卡', render: 'office' },
    { title: '工时/h', render: 'office' },
    { title: '路程/km', render: 'office' },
    {
      title: '操作',
      render: d =>
        (<Button
          onClick={() => dispatch(push('/attendance/detail'))}
          type="link"
        >{d.operation}
         </Button>),
    },
  ];

  const data = [
    {
      operation: '查看详情',
    },
  ];
  return (
    <div>
      <Table key="id" size="small" columns={columns} data={data} />
    </div>
  );
};


export default AttendanceTable;
