import React from 'react';
import { Table } from 'antd';
import { Button } from 'shineout';
import { Link } from 'react-router-dom';

const list = (props) => {
  const {
    params: { taskId, regionCode, colType }, dataSource, loading, formData: { selectValue },
  } = props;


  const columns = [
    {
      title: '产品中心',
      dataIndex: 'groupName',
      key: 'groupName',
      render: (text, record, index) => {
        console.log(text, record, index);
        if (index !== 0) {
          return <Link to={`/data-statistics-xinchao-region/trouble-ticket-xinchao2/${colType}/${taskId}/${regionCode}/${record.groupCode}`}>{text}</Link>;
        } return text;
      },
    },
    {
      title: '新增故障工单数',
      dataIndex: 'totalNum',
      key: 'totalNum',
    },
    {
      title: '未关闭工单数',
      dataIndex: 'notClosedNum',
      key: 'notClosedNum',
    },
    {
      title: '关闭工单数',
      dataIndex: 'closedNum',
      key: 'closedNum',
    },
    {
      title: '超时工单数',
      dataIndex: 'expiredNum',
      key: 'expiredNum',
    },
    {
      title: '平均处理时长',
      dataIndex: 'avgExecuteTime',
      key: 'avgExecuteTime',
    },
    {
      title: '故障率',
      dataIndex: 'faultRate',
      key: 'faultRate',
    },
  ];


  return (
    <div>
      <Table
        style={{ marginRight: 10 }}
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        loading={loading}
      />
    </div>
  );
};

export default list;

