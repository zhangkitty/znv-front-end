import React from 'react';
import Page from 'shein-lib/pagination';

import { Table, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import {
  search,
  changePage,
  changePageSize,
  openModal,
  changeTableValue,
} from '../action';


const List = (props) => {
  const {
    dataSource,
    dispatch,
    total,
    loading,
    table: { selectedRowKeys },
    modal: { buttonLoading },
    formData: { pageSize, pageNum },
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
  ];

  const rowSelection = {
    onChange: (a, b) => {
      dispatch(changeTableValue('selectedRowKeys', a));
      dispatch(changeTableValue('selectedRows', b));
    },
    getCheckboxProps: record => ({
      disabled: record.staffName !== null,
    }),
    selectedRowKeys,
  };
  return (
    <div style={{ marginRight: 10 }}>
      <div style={{ display: 'flex', marginBottom: 20 }}>
        <Button
          onClick={() => dispatch(openModal(props))}
          loading={buttonLoading}
        >
          分配质检人员
        </Button>

        <Input
          data-bind="formData.projectName"
          style={{ width: 200, marginLeft: 20 }}
          placeholder="输入项目名称进行搜素"
          onPressEnter={() => dispatch(search(props))}
        />
      </div>

      <Table
        bordered
        loading={loading}
        rowSelection={rowSelection}
        rowKey={
          record => (`${record.arecCode},${record.itemName},${record.propertyType},${record.quantity}`)
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
    </div>
  );
};


export default List;
