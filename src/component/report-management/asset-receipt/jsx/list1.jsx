import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Table } from 'shineout';

const List1 = (props) => {
  const {
    list,
    dataLoading,
    dataSource,
    choosedMonth,
  } = props;
  const arr = [];

  if (moment(choosedMonth, 'YYYYMM').daysInMonth() && dataSource.length > 0) {
    for (let i = 0; i < moment(choosedMonth, 'YYYYMM').daysInMonth(); i++) {
      arr.push({
        title: `${i + 1}号接收资产数`,
        width: 100,
      });
    }
  }

  const columns = [
    {
      title: '城市',
      width: 50,
      fixed: 'left',
    },
    {
      title: '团队',
      width: 50,
      fixed: 'left',
    },
    {
      title: '资产总数',
      width: 50,
      fixed: 'left',
    },
    {
      title: '接收总数',
      width: 50,
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
        fixed="both"
        keygen="id"
        width={1500}
        columns={columns}
        data={dataSource}
      />
    </div>
  );
};

List1.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default List1;
