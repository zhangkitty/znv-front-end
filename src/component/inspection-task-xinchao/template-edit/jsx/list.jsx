import React from 'react';
import Page from 'shein-lib/pagination';

import { Table, Button, Input, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { changePage, changePageSize, changeTableValue, create, search } from '../action';

const List = (props) => {
  const {
    dataSource,
    dispatch,
    total,
    params,
    formData: {
      pageSize,
      pageNum,
    },
    loading,
    table: {
      selectedRowKeys,
    },
  } = props;

  const columns = [
    {
      title: '省市区',
      align: 'center',
      render: v => `${v.province}${v.city}${v.area}`,
    },
    {
      title: '项目名称',
      dataIndex: 'itemName',
      align: 'center',
    },
    {
      title: '物业类型',
      dataIndex: 'propertyType',
      align: 'center',
    },
    {
      title: '终端数',
      dataIndex: 'quantity',
      align: 'center',
    },
    {
      title: '巡检人员',
      align: 'center',
      dataIndex: 'staffName',
    },
  ];

  const rowSelection = {
    onChange: (a, b) => {
      dispatch(changeTableValue('selectedRowKeys', a));
    },
    getCheckboxProps: record => ({
      disabled: record.staffName !== null && record.staffName !== params.staffName,
    }),
    selectedRowKeys,
  };


  return (
    <div style={{ marginRight: 10 }}>
      <Input
        data-bind="formData.projectName"
        style={{ width: 200, marginBottom: 10 }}
        placeholder="输入项目名称进行搜素"
        onPressEnter={() => dispatch(search(props))}
      />
      <Table
        bordered
        loading={loading}
        rowSelection={rowSelection}
        rowKey={
          record => (`${record.areaCode},${record.itemName},${record.propertyType},${record.quantity}`)
        }
        pagination={false}
        dataSource={dataSource}
        columns={columns}
      />

      <Page
        total={total}
        onChange={(current) => {
          dispatch(changePage(props, current));
        }}
        onShowSizeChange={(current, size) => {
          dispatch(changePageSize(props, current, size));
        }}
        current={pageNum}
        pageSize={pageSize}
      />


      <Popconfirm title="是否要确认" onConfirm={() => dispatch(create(props))} okText="Yes" >
        <Button>
          确定
        </Button>
      </Popconfirm>

    </div>
  );
};


export default List;
