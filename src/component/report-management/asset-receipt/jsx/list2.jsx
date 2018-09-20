import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'shineout';

const List2 = (props) => {
  const {
    list,
    dataLoading,
  } = props;

  const arr = [];
  const columns = [
    {
      title: '运维人员',
      width: 80,
      fixed: 'left',
    },
    {
      title: '城市',
      width: 80,
      fixed: 'left',
    },
    {
      title: '团队',
      width: 80,
      fixed: 'left',
    },
    {
      title: '资产总数',
      width: 100,
      fixed: 'left',
    },
    {
      title: '接收总数',
      width: 120,
      fixed: 'left',
    },
    {
      title: '当月新增资产数',
      width: 120,
      fixed: 'left',
    },
    {
      title: '当月接收资产数',
      width: 120,
      fixed: 'left',

    },
    ...arr,
  ];
  return (
    <div>
      <Table
        bordered
        keygen="id"
        columns={columns}
        data={[]}
        width={1500}
      />
    </div>
  );
};

List2.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default List2;
