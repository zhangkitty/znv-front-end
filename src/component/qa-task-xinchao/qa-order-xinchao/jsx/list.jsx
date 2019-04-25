import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const List = (props) => {
  const {
    table: {
      loading,
      dataSource,
    },
  } = props;
  const columns = [
    {
      title: '任务周期',
      align: 'center',
      render: v => (
        <div>
          {`${v.startTime}-${v.endTime}`}
        </div>
      ),
    },
    {
      title: '质检人员',
      dataIndex: 'staffName',
      align: 'center',
    },
    {
      title: '省市区',
      render: v => `${v.region}${v.city}${v.area}`,
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
      title: '设备编号',
      dataIndex: 'deviceId',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'statusName',
      align: 'center',
    },
    {
      title: '错漏刊指标',
      render: (v) => {
        if (v.detail && v.detailDto.publish.name) {
          return v.detailDto.publish.name;
        }
        return '';
      },
      align: 'center',
    },
    {
      title: '屏幕清洁度指标',
      render: (v) => {
        if (v.detail && v.detailDto.cleanness.name) {
          return v.detailDto.cleanness.name;
        }
        return '';
      },
      align: 'center',
    },
    {
      title: '形象品质指标',
      render: (v) => {
        if (v.detail && v.detailDto.quality.name) {
          return v.detailDto.quality.name;
        }
        return '';
      },
      align: 'center',
    },
    {
      title: '设备声音指标',
      render: (v) => {
        if (v.detail && v.detailDto.sound.name) {
          return v.detailDto.sound.name;
        }
        return '';
      },
      align: 'center',
    },
    {
      title: '广告播放同步',
      render: (v) => {
        if (v.detail && v.detailDto.playSync.name) {
          return v.detailDto.playSync.name;
        }
        return '';
      },
      align: 'center',
    },
    {
      title: '照片',
      render: (v) => {
        if (v.detail && v.detailDto.photo.name) {
          return v.detailDto.photo.name;
        }
        return '';
      },
      align: 'center',
    },
    {
      title: '故障指标',
      render: (v) => {
        if (v.detail && v.detailDto.fault.name) {
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
        dataSource={dataSource}
        loading={loading}
        columns={columns}
      />
    </div>
  );
};

export default List;
