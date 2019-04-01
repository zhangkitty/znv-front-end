import React from 'react';
import { Table, Button } from 'antd';

const tmp = (props) => {
  const { dataSource } = props;
  const columns = [{
    title: '设备编码',
    dataIndex: 'deviceId',
    key: 'deviceId',
    align: 'center',
  },
  {
    title: '入库时间',
    dataIndex: 'storteTime',
    key: 'storteTime',
    align: 'center',
  },
  {
    title: '设备状态',
    dataIndex: 'deviceStatusName',
    key: 'deviceStatusName',
    align: 'center',
  },
  {
    title: '设备等级',
    dataIndex: 'deviceGradeName',
    key: 'deviceGradeName',
    align: 'center',
  },
  {
    title: '当前责任人',
    dataIndex: 'liablePname',
    key: 'liablePname',
    align: 'center',
  },
  {
    title: '所属城市',
    dataIndex: 'areaCodeName',
    key: 'areaCodeName',
    align: 'center',
  },
  {
    title: '绑定资产',
    dataIndex: 'assetId',
    key: 'assetId',
    align: 'center',
  },
  {
    title: '安装地址',
    dataIndex: 'installAddress',
    key: 'installAddress',
    align: 'center',
  },
  {
    title: '操作',
    align: 'center',
    render: () => {
      console.log(1);
      return (
        <Button>查看详情</Button>
      );
    },
  },
  ];
  return (
    <div style={{ marginTop: 10 }}>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default tmp;
