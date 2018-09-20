import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'shineout';

const List1 = (props) => {
  const {
    list,
    dataLoading,
  } = props;

  const arr = [];
  const columns = [
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
      title: '投放数',
      width: 100,
      fixed: 'left',

    },
    {
      title: '应投数',
      width: 120,
      fixed: 'left',

    },
    {
      title: '实投数',
      width: 120,
      fixed: 'left',

    },
    {
      title: '已监播数',
      width: 120,
      fixed: 'left',

    },
    {
      title: '未监播数',
      width: 140,
      fixed: 'left',

    },
    {
      title: '完成进度',
      width: 150,
      fixed: 'left',

    },
    ...arr,
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

List1.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default List1;
