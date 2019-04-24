import React from 'react';
import { Table } from 'antd';
import { Button } from 'shineout';
import { Link } from 'react-router-dom';

const list = (props) => {
  const { dataSource, loading, formData: { selectValue } } = props;
  console.log(dataSource);

  const columns = [
    {
      title: '产品中心',
      dataIndex: 'colName',
      key: 'colName',
      render: (text, record, index) => {
        console.log(text, record, index);
        if (1 === 2) {
          return <Link to={`/data-statistics-xinchao/inspection-order-xinchao1/${selectValue}/${record.colCode}`}>{text}</Link>;
        } return text;
      },
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

