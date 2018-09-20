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
      width: 120,
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
      title: '巡检资产数',
      width: 100,
      fixed: 'left',

    },
    {
      title: '已完成',
      width: 120,
      fixed: 'left',

    },
    {
      title: '未完成',
      width: 120,
      fixed: 'left',

    },
    {
      title: '完成率',
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
        width={2000}
      />
    </div>
  );
};

List2.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default List2;
