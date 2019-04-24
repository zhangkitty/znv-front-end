import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const List = (props) => {
  const {
    list,
    dataLoading,
  } = props;
  const columns = [
    {
      title: '巡检计划标题',
      dataIndex: 'inStorageNo',
      align: 'center',
    },
    {
      title: '巡检人员',
      dataIndex: 'produceOrderId',
      align: 'center',
    },
    {
      title: '省市区',
      dataIndex: 'productionGroup',
      align: 'center',
    },
    {
      title: '项目名称',
      dataIndex: 'inStorageNo',
      align: 'center',
    },
    {
      title: '物业类型',
      dataIndex: 'produceOrderId',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'productionGroup',
      align: 'center',
    },
    {
      title: '屏幕清洁度指标',
      dataIndex: 'inStorageNo',
      align: 'center',
    },
    {
      title: '设备声音指标',
      dataIndex: 'produceOrderId',
      align: 'center',
    },
    {
      title: '设备标签指标',
      dataIndex: 'productionGroup',
      align: 'center',
    },
    {
      title: '广告播放同步',
      dataIndex: 'inStorageNo',
      align: 'center',
    },
    {
      title: '声音同步指标',
      dataIndex: 'produceOrderId',
      align: 'center',
    },
    {
      title: '故障指标',
      dataIndex: 'productionGroup',
      align: 'center',
    },
    {
      title: '完成时间',
      dataIndex: 'productionGroup',
      align: 'center',
    },
  ];
  return (
    <div style={{ marginTop: 10, marginRight: 10 }}>
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
