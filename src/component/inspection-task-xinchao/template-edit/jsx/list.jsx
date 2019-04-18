import React from 'react';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';

const List = (props) => {
  const {
    dataSource,
  } = props;
  const columns = [
    {
      title: '模板标题',
      dataIndex: 'taskName',
      align: 'center',
    },
    {
      title: '巡检人员',
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
      title: '操作',
      align: 'center',
      render: () => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Link to="www.baidu.com">编辑</Link>
          <Link to="www.baidu.com">转移他人</Link>
        </div>
      ),
    },
  ];
  return (
    <div style={{ marginRight: 10 }}>
      <Button
        style={{ marginBottom: 10 }}
      >
        新增巡检模板
      </Button>

      <Table
        bordered
        rowKey="id"
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};


export default List;
