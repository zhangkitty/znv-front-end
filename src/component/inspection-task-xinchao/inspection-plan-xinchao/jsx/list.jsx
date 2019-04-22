import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const List = (props) => {
  const {
    table: {
      dataSource,
      loading,
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
      dataIndex: 'finishCount', // todo 计划巡检数
      align: 'center',
    },
    {
      title: '实际巡检数',
      dataIndex: 'finishCount',
      align: 'center',
    },
    {
      title: '完成率',
      dataIndex: 'deviceCount',
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
      />
    </div>
  );
};


export default List;
