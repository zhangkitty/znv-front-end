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
      width: 100,
      fixed: 'left',
    },
    {
      title: '城市',
      dataIndex: '',
      width: 100,
      fixed: 'left',
    },
    {
      title: '团队',
      dataIndex: '',
      width: 100,
      fixed: 'left',
    },
    {
      title: '资产总数',
      dataIndex: '',
      width: 100,
      fixed: 'left',
    },
    {
      title: '已接收资产数',
      width: 100,
      fixed: 'left',
    },
    {
      title: '待接收资产数',
      width: 100,
      fixed: 'left',
    },
    {
      title: '无法接收资产数',
      width: 100,
      fixed: 'left',
    },
    {
      title: '超7天未接收资产数',
      width: 100,
      fixed: 'left',
    },
    {
      title: '当月新增验收资产数',
      width: 100,
      fixed: 'left',
    },
    {
      title: '当月接收资产数',
      width: 100,
      fixed: 'left',
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
