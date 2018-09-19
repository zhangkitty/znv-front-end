import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const List2 = (props) => {
  const {
    list,
    dataLoading,
  } = props;
  const columns = [
    {
      title: '运维人员',
      dataIndex: '',
      width: 120,
      fixed: 'left',
      align: 'center',
    },
    {
      title: '城市',
      dataIndex: '',
      width: 80,
      fixed: 'left',
      align: 'center',
    },
    {
      title: '团队',
      dataIndex: '',
      width: 80,
      fixed: 'left',
      align: 'center',

    },
    {
      title: '投放数',
      dataIndex: '',
      width: 100,
      fixed: 'left',
      align: 'center',

    },
    {
      title: '应投数',
      width: 120,
      fixed: 'left',
      align: 'center',

    },
    {
      title: '实投数',
      width: 120,
      fixed: 'left',
      align: 'center',

    },
    {
      title: '已监播数',
      width: 120,
      fixed: 'left',
      align: 'center',

    },
    {
      title: '未监播数',
      width: 140,
      fixed: 'left',
      align: 'center',

    },
    {
      title: '1',
    },
    {
      title: '2',
    },
    {
      title: '3',
      width: 100,
    },
  ];

  return (
    <div>
      <Table
        bordered
        rowKey="id"
        columns={columns}
        scroll={{ x: 2000 }}
      />
    </div>
  );
};

List2.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default List2;
