import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'shineout';

const List = (props) => {
  const {
    dataSource, tableReady,
  } = props;
  const columns = [
    {
      title: 'FSU序列号',
      render: '0',
    },
    {
      title: 'FSUID',
      render: '1',
    },
    {
      title: '站址名称',
      render: '2',
    },
    {
      title: '状态',
      render: (d) => {
        const table = {
          1: '在线',
          2: <span style={{ color: 'red' }}>离线</span>,
        };
        return table[d[3]];
      },
    },
    {
      title: '类型',
      render: '4',
    },
    {
      title: 'IP',
      render: '5',
    },
    {
      title: '网络',
      render: '6',
    },
    {
      title: '信号',
      render: '7',
    },
    {
      title: '模式',
      render: '8',
    },
    {
      title: '电池',
      render: '9',
    },
    {
      title: '跟新时间',
      render: '10',
    },
    {
      title: '入网时间',
      render: '11',
    },
    {
      title: '操作',
      render: d => (
        <div style={{ display: 'flex' }}>
          <Button type="link">定位</Button>
          <Button type="link">查看</Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        bordered
        loading={!tableReady}
        data={dataSource}
        columns={columns}
      />
    </div>
  );
};


export default List;
