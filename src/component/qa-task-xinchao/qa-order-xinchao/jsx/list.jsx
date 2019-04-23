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
      title: '任务周期',
      dataIndex: 'inStorageNo',
      width: 100,
    },
    {
      title: '质检人员',
      dataIndex: 'produceOrderId',
      width: 100,
    },
    {
      title: '省市区',
      dataIndex: 'productionGroup',
      width: 100,
    },
    {
      title: '项目名称',
      dataIndex: 'inStorageNo',
      width: 100,
    },
    {
      title: '物业类型',
      dataIndex: 'produceOrderId',
      width: 100,
    },
    {
      title: '设备编号',
      dataIndex: 'productionGroup',
      width: 100,
    },
    {
      title: '任务周期',
      dataIndex: 'inStorageNo',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'produceOrderId',
      width: 100,
    },
    {
      title: '错漏刊指标',
      dataIndex: 'produceOrderId',
      width: 100,
    },
    {
      title: '屏幕清洁度指标',
      dataIndex: 'produceOrderId',
      width: 100,
    },
    {
      title: '形象品质指标',
      dataIndex: 'produceOrderId',
      width: 100,
    },
    {
      title: '设备声音指标',
      dataIndex: 'produceOrderId',
      width: 100,
    },
    {
      title: '广告播放同步',
      dataIndex: 'produceOrderId',
      width: 100,
    },
    {
      title: '照片',
      dataIndex: 'produceOrderId',
      width: 100,
    },
    {
      title: '故障指标',
      dataIndex: 'produceOrderId',
      width: 100,
    },
    {
      title: '完成时间',
      dataIndex: 'produceOrderId',
      width: 100,
    },
  ];
  return (
    <div>
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
