import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';

const List = (props) => {
  const {
    list,
    dataLoading,
  } = props;
  const columns = [
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 100,
    },
    {
      title: '创建人',
      dataIndex: 'produceOrderId',
      width: 100,
    },
    {
      title: '省市区',
      dataIndex: 'productionGroup',
      width: 100,
    },
    {
      title: '设备编号',
      dataIndex: 'inStorageNo',
      width: 100,
    },
    {
      title: '项目名称',
      dataIndex: 'itemName',
      width: 100,
    },
    {
      title: '故障类别',
      dataIndex: 'productionGroup',
      width: 100,
    },
    {
      title: '工单状态',
      dataIndex: 'productionGroup',
      width: 100,
    },
    {
      title: '是否超时',
      dataIndex: 'productionGroup',
      width: 100,
    },
    {
      title: '当前处理人',
      dataIndex: 'productionGroup',
      width: 100,
    },
    {
      title: '最新更新时间',
      dataIndex: 'productionGroup',
      width: 100,
    },
  ];
  return (
    <div>
      <div>
        <Button
          onClick={() => console.log(1)}
        >
          创建故障工单
        </Button>
      </div>
      <Table
        bordered
        rowKey="id"
        dataSource={list}
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
