import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'shineout';

const List1 = (props) => {
  const {
    list,
    dataLoading,
    dispatch,
    total,
    page,
    pageSize,
  } = props;

  const arr = [];
  const columns = [
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
      title: '巡检资产数',
      dataIndex: '',
      width: 100,
      fixed: 'left',
      align: 'center',

    },
    {
      title: '已完成',
      width: 120,
      fixed: 'left',
      align: 'center',

    },
    {
      title: '未完成',
      width: 120,
      fixed: 'left',
      align: 'center',

    },
    {
      title: '完成率',
      width: 120,
      fixed: 'left',
      align: 'center',

    },
    ...arr,
  ];
  return (
    <div>
      <Table
        bordered
        fixed="both"
        keygen="id"
        columns={columns}
        width={200}
      />


    </div>
  );
};

List1.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default List1;
