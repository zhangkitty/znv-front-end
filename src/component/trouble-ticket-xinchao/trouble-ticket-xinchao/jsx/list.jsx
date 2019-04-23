import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import { openModal } from '../action';

const List = (props) => {
  const {
    dataSource,
    total,
    dispatch,
    table: { loading },
  } = props;
  const columns = [
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
    },
    {
      title: '创建人',
      dataIndex: 'creatorName',
      align: 'center',
    },
    {
      title: '省市区',
      render: v => `${v.region}${v.city}${v.area}`,
      align: 'center',
    },
    {
      title: '设备编号',
      dataIndex: 'deviceId',
      align: 'center',
    },
    {
      title: '项目名称',
      dataIndex: 'itemName',

      align: 'center',
    },
    {
      title: '故障类别',
      render: v => (
        v.detailDto.faultDesc
      ),
      align: 'center',
    },
    {
      title: '工单状态',
      dataIndex: 'statusName',
      align: 'center',
    },
    {
      title: '是否超时',
      dataIndex: 'expiredFlag',
      align: 'center',
    },
    {
      title: '当前处理人',
      dataIndex: 'staffName',
      align: 'center',
    },
    {
      title: '最新更新时间',
      dataIndex: 'updateTime',
      align: 'center',
    },
  ];
  return (
    <div style={{ marginRight: 10 }}>
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <Button
          onClick={() => dispatch(openModal(props))}
        >
          创建故障工单
        </Button>
      </div>
      <Table
        bordered
        rowKey="id"
        dataSource={dataSource}
        loading={loading}
        columns={columns}
        onRow={record => ({
            onClick: (event) => {
              window.location.hash = `/trouble-ticket-xinchao/trouble-ticket-xinchao-detail/${record.workOrderId}`;
            },
          })}
      />
    </div>
  );
};


export default List;