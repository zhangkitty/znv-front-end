import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { Button } from 'shineout';
import Page from 'shein-lib/pagination';
import { changePage, changePageSize, getLifeTime } from '../action';


const List = (props) => {
  const {
    dispatch,
    dataSource,
    tableLoading,
    total,
    formData: {
      pageNum,
      pageSize,
    },
    myModal: {
      buttonLoading,
    },
  } = props;
  const columns = [
    {
      title: '告警时间',
      width: 100,
      dataIndex: 'alarmTime',
    },
    {
      title: '告警级别',
      width: 100,
      dataIndex: 'alarmLevel',
    },
    {
      title: '告警类型',
      width: 100,
      dataIndex: 'alarmType',
    },
    {
      title: '设备类型',
      width: 100,
      dataIndex: 'deviceType',
    },
    {
      title: '公司名称',
      width: 100,
      dataIndex: 'type',
    },
    {
      title: '区域',
      width: 100,
      dataIndex: 'areaName',
    },
    {
      title: '告警资产',
      width: 100,
      dataIndex: 'name',
    },
    {
      title: '状态',
      width: 100,
      dataIndex: 'alamStatus',
    },
    {
      title: '告警创建时间',
      width: 100,
      dataIndex: 'createTime',
    },
    {
      title: '告警消除时间',
      width: 100,
      dataIndex: 'clearTime',
    },
    {
      title: '操作',
      width: 100,
      dataIndex: 'assetNumber',
      render: (text, record, index) => {
        console.log(record);
        return <Button loading={dataSource[index].buttonLoading} type="primary" onClick={() => dispatch(getLifeTime(record.taskId, index))}>生命周期</Button>;
      },
    },
  ];
  return (
    <div>
      <Table
        bordered
        pagination={false}
        rowKey="id"
        dataSource={dataSource}
        loading={tableLoading}
        columns={columns}
      />
      <Page
        total={total}
        current={pageNum}
        pageSize={pageSize}
        onChange={(current) => {
          console.log(current);
          console.log(props);
          dispatch(changePage(props, current));
        }}
        onShowSizeChange={(current, size) => {
          console.log(current);
          console.log(size);
          dispatch(changePageSize(props, current, size));
        }}

      />
    </div>
  );
};

List.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
};

export default List;
