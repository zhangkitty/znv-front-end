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
      align: 'center',
      render: v => (
        <div>
            `${v.startTime}-{v.endTime}`
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
        if (v.DetailDto.publish.name) {
          return v.DetailDto.publish.name;
        }
        return '';
      },
      align: 'center',
    },
    {
      title: '屏幕清洁度指标',
      render: (v) => {
        if (v.DetailDto.cleanness.name) {
          return v.DetailDto.cleanness.name;
        }
        return '';
      },
      align: 'center',
    },
    {
      title: '形象品质指标',
      render: (v) => {
        if (v.DetailDto.quality.name) {
          return v.DetailDto.quality.name;
        }
        return '';
      },
      align: 'center',
    },
    {
      title: '设备声音指标',
      render: (v) => {
        if (v.DetailDto.sound.name) {
          return v.DetailDto.sound.name;
        }
        return '';
      },
      align: 'center',
    },
    {
      title: '广告播放同步',
      render: (v) => {
        if (v.DetailDto.playSync.name) {
          return v.DetailDto.playSync.name;
        }
        return '';
      },
      align: 'center',
    },
    {
      title: '照片',
      render: (v) => {
        if (v.DetailDto.photo.name) {
          return v.DetailDto.photo.name;
        }
        return '';
      },
      align: 'center',
    },
    {
      title: '故障指标',
      render: (v) => {
        if (v.DetailDto.fault.name) {
          return v.DetailDto.fault.name;
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
