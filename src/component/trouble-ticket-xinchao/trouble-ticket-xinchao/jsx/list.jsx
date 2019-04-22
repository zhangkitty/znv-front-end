import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';

const List = (props) => {
  const {
    dataSource,
    total,
    dataLoading,
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
      dataIndex: 'productionGroup',
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
          onClick={() => console.log(1)}
        >
          创建故障工单
        </Button>
      </div>
      <Table
        bordered
        rowKey="id"
        dataSource={dataSource}
        loading={dataLoading}
        columns={columns}
      />
    </div>
  );
};

List.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default List;
