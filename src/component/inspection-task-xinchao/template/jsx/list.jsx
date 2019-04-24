import React from 'react';
import Page from 'shein-lib/pagination';
import { Table, Button } from 'antd';
import { Button as SheinButton } from 'shineout';
import { Link } from 'react-router-dom';
import { openModal, changePage, changePageSize } from '../action';


const List = (props) => {
  const {
    dataSource,
    dispatch,
    total,
    formData: {
      pageNum,
      pageSize,
    },

  } = props;
  const columns = [
    {
      title: '模板标题',
      dataIndex: 'taskName',
      align: 'center',
    },
    {
      title: '巡检人员',
      render: v => (`${v.staffName}(${v.staffNo})`),
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
      title: '操作',
      align: 'center',
      render: v => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Link
            style={{ lineHeight: '29px' }}
            to={`/inspection-task-xinchao/template-edit/${v.id}/${v.taskName}/${v.staffId}/${v.staffName}`}
          >编辑
          </Link>
          <SheinButton
            type="link"
            onClick={() => dispatch(openModal(props, v))}
          >转移他人
          </SheinButton>
        </div>
      ),
    },
  ];
  return (
    <div style={{ marginRight: 10 }}>
      <Button
        style={{ marginBottom: 10 }}
        onClick={() => location.hash = '/inspection-task-xinchao/template-add'}
      >
      新增巡检模板
      </Button>

      <Table
        bordered
        rowKey="id"
        dataSource={dataSource}
        columns={columns}
        pagination={false}
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
