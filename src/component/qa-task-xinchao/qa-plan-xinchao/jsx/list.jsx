import React from 'react';
import Page from 'shein-lib/pagination';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { changePage, changePageSize } from '../action';


const List = (props) => {
  const {
    dataSource,
    dispatch,
    total,
    formData: {
      pageSize,
      pageNum,
    },
  } = props;
  const columns = [
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      align: 'center',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      align: 'center',
    },
    {
      title: '质检人员',
      dataIndex: 'staffName',
      align: 'center',
    },
    {
      title: '项目数',
      dataIndex: 'itemCount',
      align: 'center',
    },
    {
      title: '终端数',
      dataIndex: 'deviceCount',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'statusName',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
      render: (v) => {
        if (v.status == 2) {
          return (
            <div>
              <Link to={`/qa-task-xinchao/qa-plan-xinchao-check/${v.id}`}>查看</Link>
            </div>
          );
        }
        return (
          <div style={{ display: 'flex' }}>
            <Link style={{ width: '50%' }} to={`/qa-task-xinchao/qa-plan-xinchao-check/${v.id}`}>查看</Link>
            <Link to={`/qa-task-xinchao/qa-plan-xinchao-edit/${v.id}/${v.taskName}`}>编辑</Link>
          </div>

        );
      },
    },
  ];
  return (
    <div
      style={{ marginTop: 10, marginRight: 10 }}
    >
      <Table
        bordered
        rowKey="id"
        dataSource={dataSource}
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
