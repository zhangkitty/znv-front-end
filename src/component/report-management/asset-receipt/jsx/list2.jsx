import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Table } from 'shineout';

const List2 = (props) => {
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
        render: `${moment(choosedMonth).format('YYYY')}${i + 1}`,
      });
    }
  }

  const columns = [
    {
      title: '运维人员',
      width: 80,
      fixed: 'left',
      render: 'executor',
    },
    {
      title: '城市',
      width: 80,
      fixed: 'left',
      render: 'areaName',
    },
    {
      title: '团队',
      width: 80,
      fixed: 'left',
      render: (d) => {
        if (d.teamId) {
          return d.teamId;
        }
        return 999;
      },
    },
    {
      title: '资产总数',
      width: 80,
      fixed: 'left',
      render: 'totalAsset',
    },
    {
      title: '接收总数',
      width: 80,
      fixed: 'left',
      render: 'acceptedAsset',
    },
    {
      title: '当月新增资产数',
      width: 120,
      fixed: 'left',
      render: 'incrAsset',
    },
    {
      title: '当月接收资产数',
      width: 120,
      fixed: 'left',
      render: 'incrAcceptedAsset',
    },
    ...arr,
  ];
  const data = dataSource.map((v) => {
    const arr = v.listDays.map(k => ({ [k.dataTime]: k.incrAcceptedAsset }));
    return Object.assign({}, v, ...arr);
  });
  return (
    <div>
      <Table
        bordered
        fixed="both"
        keygen="id"
        width={4000}
        style={{ maxHeight: 400 }}
        columns={columns}
        data={data}
      />
    </div>
  );
};

List2.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default List2;
