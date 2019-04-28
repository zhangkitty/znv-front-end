import React from 'react';
import Zmage from 'react-zmage';
import { Table } from 'antd';
import Page from 'shein-lib/pagination';
import {
  changePage,
  changePageSize,
} from '../action';

const List = (props) => {
  const {
    dispatch,
    table: {
      loading,
      dataSource,
      total,
    },
    formData: {
      pageNum,
      pageSize,
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
      title: '错漏刊',
      render: (v) => {
        if (v.detailDto && v.detailDto.publish.name) {
          return v.detailDto.publish.name;
        }
        return '';
      },
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
      title: '形象品质超标',
      render: (v) => {
        if (v.detailDto && v.detailDto.quality.name) {
          return v.detailDto.quality.name;
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
      title: '照片',
      render: (v) => {
        if (v.detailDto && v.detailDto.photo.url && v.detailDto.photo.url.faultphoto) {
          return (<Zmage
            style={{ width: 100 }}
            src={v.detailDto.photo.url.faultphoto}
            alt=""
          />);
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
        dataSource={dataSource}
        loading={loading}
        columns={columns}
        pagination={false}
      />

      <Page
        total={total}
        onChange={(pageValue) => {
          dispatch(changePage(props, pageValue));
        }}
        onShowSizeChange={(current, size) => {
          dispatch(changePageSize(props, current, size));
        }}
        current={pageNum}
        pageSize={pageSize}
      />
    </div>
  );
};

export default List;
