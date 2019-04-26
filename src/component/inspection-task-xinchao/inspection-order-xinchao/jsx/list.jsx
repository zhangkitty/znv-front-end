import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const List = (props) => {
  const {
    table: { loading, dataSource, total },
  } = props;
  const columns = [
    {
      title: '巡检计划标题',
      dataIndex: 'taskName',
      align: 'center',
    },
    {
      title: '巡检人员',
      dataIndex: 'staffName',
      align: 'center',
    },
    {
      title: '省市区',
      render: v => (`${v.region}${v.city}${v.area}`),
      align: 'center',
    },
    {
      title: '项目名称',
      dataIndex: 'itemName',
      align: 'center',
    },
    {
      title: '物业类型',
      dataIndex: 'propertyName',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'statusName',
      align: 'center',
    },
    {
      title: '屏幕清洁度超标',
      render: (v) => {
        if (v.detailDto && v.detailDto.cleanness.name) {
          return v.detailDto.cleanness.name;
        }
        return '';
      },
      align: 'center',
    },
    {
      title: '声音检测超标',
      render: (v) => {
        if (v.detailDto && v.detailDto.sound.name) {
          return v.detailDto.sound.name;
        }
        return '';
      },
      align: 'center',
    },
    {
      title: '设备标签超标',
      render: (v) => {
        if (v.detailDto && v.detailDto.label.name) {
          return v.detailDto.label.name;
        }
        return '';
      },
      align: 'center',
    },
    {
      title: '广告播放同步',
      render: (v) => {
        if (v.detailDto && v.detailDto.playSync.name) {
          return v.detailDto.playSync.name;
        }
        return '';
      },
      align: 'center',
    },
    {
      title: '声音同步',
      render: (v) => {
        if (v.detailDto && v.detailDto.soundSync.name) {
          return v.detailDto.soundSync.name;
        }
        return '';
      },
      align: 'center',
    },
    {
      title: '故障',
      render: (v) => {
        if (v.detailDto && v.detailDto.fault.name) {
          return v.detailDto.fault.name;
        }
        return '';
      },
      align: 'center',
    },
    {
      title: '完成时间',
      dataIndex: 'finishTime',
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
