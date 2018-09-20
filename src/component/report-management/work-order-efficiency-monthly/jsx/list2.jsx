import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'shineout';

const List2 = (props) => {
  const {
    list,
    dataLoading,
    dataSource,
  } = props;


  const columns = [
    {
      title: '运维人员',
      render: 'executor',
      width: 80,
      fixed: 'left',
    },
    {
      title: '城市',
      render: 'areaCode',
      width: 80,
      fixed: 'left',
    },
    {
      title: '团队',
      render: 'teamId',
      width: 80,
      fixed: 'left',

    },
    {
      title: '当月新增',
      rende: 'incrOrder',
      width: 100,
      fixed: 'left',

    },
    {
      title: '当月关闭',
      render: 'incrClosedOrder',
      width: 120,
      fixed: 'left',

    },
    {
      title: '工单总数',
      render: 'incrOrder',
      width: 120,
      fixed: 'left',

    },
    {
      title: '已关闭',
      render: 'incrClosedOrder',
      width: 120,
      fixed: 'left',

    },
    {
      title: '超时关闭',
      width: 140,
      fixed: 'left',

    },
    {
      title: '完成率',
      width: 150,
      fixed: 'left',

    },
    {
      title: '及时关闭率',
      width: 120,
      fixed: 'left',

    },
    {
      title: '未关闭',
      render: 'incrTimeoutUnclosedOrder',
      width: 120,
      fixed: 'left',

    },
    {
      title: '超时未关闭',
      render: 'incrTimeoutUnclosedOrder',
      width: 120,
      fixed: 'left',

    },
    {
      title: '平均处理时长',
      render: 'finishAvgDuration',
      width: 120,
      fixed: 'left',

    },
  ];


  return (
    <div>
      <Table
        bordered
        rowKey="id"
        columns={columns}
        width={1500}
        data={dataSource}
      />
    </div>
  );
};

List2.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default List2;
