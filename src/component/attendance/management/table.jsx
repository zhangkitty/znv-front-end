import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import Page from 'shein-lib/pagination';
import { changePage, changePageSize } from './actions';


import { Table, Button } from 'shineout';

const AttendanceTable = (props) => {
  const {
    dispatch, formData: { total, page, pageSize }, dataSource, loading,
  } = props;

  const columns = [
    { title: '运维人员', render: d => d.executorName },
    { title: '城市', render: d => d.areaName },
    { title: '团队', render: 'country' },
    { title: '日期', render: d => d.dataTime },
    { title: '上班卡', render: d => d.startTime },
    { title: '下班卡', render: d => d.endTime },
    { title: '工时/h', render: d => d.workTime },
    { title: '路程/km', render: d => d.workDistance },
    {
      title: '操作',
      render: d =>
        (<Button
          onClick={() => dispatch(push(`/attendance/detail/${d.executor}/${d.dataTime}`))}
          type="link"
        >查看详情
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
      <Table key="id" size="small" columns={columns} data={dataSource} loading={loading} />
      <Page
        total={total}
        current={page}
        pageSize={pageSize}
        onChange={(pageValue) => {
          dispatch(changePage(props, pageValue));
        }}
        onShowSizeChange={(current, size) => {
          console.log(current);
          console.log(size);
          dispatch(changePageSize(props, size));
        }}
      />
    </div>
  );
};


export default AttendanceTable;
