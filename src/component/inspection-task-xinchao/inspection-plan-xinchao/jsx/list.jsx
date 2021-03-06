import React from 'react';
import Page from 'shein-lib/pagination';

import { Table } from 'antd';
import { changePage, changePageSize } from '../action';


const List = (props) => {
  const {
    dispatch,
    table: {
      dataSource,
      loading,
      total,
    },
    formData: {
      pageNum,
      pageSize,
    },
  } = props;
  const columns = [
    {
      title: '计划标题',
      dataIndex: 'taskName',
      align: 'center',
    },
    {
      title: '任务周期',
      render: v => `${v.beginTime}-${v.endTime}`,
      align: 'center',
    },
    {
      title: '巡检人员',
      dataIndex: 'staffName',
      align: 'center',
    },
    {
      title: '计划巡检数',
      dataIndex: 'deviceCount',
      align: 'center',
    },
    {
      title: '实际巡检数',
      dataIndex: 'finishCount',
      align: 'center',
    },
    {
      title: '完成率',
      render: (v) => {
        if (v.deviceCount == 0) {
          return '0.00%';
        }
        return `${Number((Math.round(v.finishCount / v.deviceCount * 10000) / 100)).toFixed(2)}%`;
      },
      align: 'center',
    },
  ];
  return (
    <div style={{ marginTop: 10, marginRight: 10 }}>
      <Table
        bordered
        rowKey="id"
        dataSource={dataSource}
        loading={loading}
        columns={columns}
        pagination={false}
        // onRow={record => ({
        //   onClick: (event) => {
        //     window.location.hash = `/inspection-task-xinchao/inspection-order-xinchao/${record.id}/${record.staffId}`;
        //   },
        // })}
      />

      <Page
        total={total}
        onChange={(pageValue) => {
          dispatch(changePage(props, pageValue));
        }}
        onShowSizeChange={(current, size) => {
          dispatch(changePageSize(props, current, size));
        }}
        current={pageNum}
        pageSize={pageSize}
      />
    </div>
  );
};


export default List;
