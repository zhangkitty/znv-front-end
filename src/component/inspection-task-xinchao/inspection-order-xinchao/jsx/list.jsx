import React from 'react';
import PropTypes from 'prop-types';
import Zmage from 'react-zmage';
import Page from 'shein-lib/pagination';

import { Table } from 'antd';
import {
  changePage,
  changePageSize,
} from '../action';

const List = (props) => {
  const {
    dispatch,
    table: { loading, dataSource, total },
    formData: {
      pageSize,
      pageNum,
    },
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
      title: '屏幕清洁度超标',
      render: (v) => {
        if (v.detailDto && v.detailDto.cleanness.name) {
          if (v.detailDto.cleanness.url && v.detailDto.cleanness.url.cleanness) {
            return (
              <div>
                <div>
                  { v.detailDto.cleanness.name}
                </div>
                <div>
                  <Zmage
                    style={{ width: 100, height: 20 }}
                    src={v.detailDto.cleanness.url.cleanness}
                    alt=""
                  />
                </div>
              </div>
            );
          }
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
          if (v.detailDto.sound.url && v.detailDto.sound.url.sound) {
            return (
              <div>
                <div>
                  { v.detailDto.sound.name}
                </div>
                <div>
                  <Zmage
                    style={{ width: 100, height: 20 }}
                    src={v.detailDto.cleanness.url.cleanness}
                    alt=""
                  />
                </div>
              </div>
            );
          }
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
          if (v.detailDto.label.url && v.detailDto.label.url.label) {
            return (
              <div>
                <div>
                  { v.detailDto.label.name}
                </div>
                <div>
                  <Zmage
                    style={{ width: 100, height: 20 }}
                    src={v.detailDto.label.url.label}
                    alt=""
                  />
                </div>
              </div>
            );
          }
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
          if (v.detailDto.playSync.url && v.detailDto.playSync.url.playSync) {
            return (
              <div>
                <div>
                  { v.detailDto.playSync.name}
                </div>
                <div>
                  <Zmage
                    style={{ width: 100, height: 20 }}
                    src={v.detailDto.playSync.url.playSync}
                    alt=""
                  />
                </div>
              </div>
            );
          }
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
          if (v.detailDto.soundSync.url && v.detailDto.soundSync.url.soundSync) {
            return (
              <div>
                <div>
                  { v.detailDto.soundSync.name}
                </div>
                <div>
                  <Zmage
                    style={{ width: 100, height: 20 }}
                    src={v.detailDto.soundSync.url.soundSync}
                    alt=""
                  />
                </div>
              </div>
            );
          }
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
