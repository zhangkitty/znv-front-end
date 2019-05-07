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
          return <Link to={`/data-statistics-xinchao-region/inspection-order-xinchao1/${selectValue}/${record.colCode}`}>{text}</Link>;
        } return text;
      },
    },
    {
      title: '计划完成',
      dataIndex: 'totalNum',
      key: 'totalNum',
    },
    {
      title: '实际完成',
      dataIndex: 'finishNum',
      key: 'finishNum',
    },
    {
      title: '完成率',
      dataIndex: 'finishRate',
      key: 'finishRate',
    },
    {
      title: '人均工作量',
      dataIndex: 'staffAvgNum',
      key: 'staffAvgNum',
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

