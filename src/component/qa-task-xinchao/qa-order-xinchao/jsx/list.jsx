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
      dataIndex: 'createTime',
      align: 'center',
    },
    {
      title: '质检人员',
      dataIndex: 'staffName',
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
      title: '设备编号',
      dataIndex: 'productionGroup',
      align: 'center',
    },
    {
      title: '任务周期',
      dataIndex: 'inStorageNo',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'produceOrderId',
      align: 'center',
    },
    {
      title: '错漏刊指标',
      dataIndex: 'produceOrderId',
      align: 'center',
    },
    {
      title: '屏幕清洁度指标',
      dataIndex: 'produceOrderId',
      align: 'center',
    },
    {
      title: '形象品质指标',
      dataIndex: 'produceOrderId',
      align: 'center',
    },
    {
      title: '设备声音指标',
      dataIndex: 'produceOrderId',
      align: 'center',
    },
    {
      title: '广告播放同步',
      dataIndex: 'produceOrderId',
      align: 'center',
    },
    {
      title: '照片',
      dataIndex: 'produceOrderId',
      align: 'center',
    },
    {
      title: '故障指标',
      dataIndex: 'produceOrderId',
      align: 'center',
    },
    {
      title: '完成时间',
      dataIndex: 'produceOrderId',
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
