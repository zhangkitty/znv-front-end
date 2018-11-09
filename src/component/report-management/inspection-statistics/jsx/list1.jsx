import React from 'react';
import moment from 'moment';
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
    dataSource,
  } = props;

  const arr = [];

  for (let i = props.formData.kkk[0].unix(); i <= props.formData.kkk[1].unix(); i += 3600 * 24) {
    arr.push({
      title: `${moment.unix(i).format('YYYY-MM-DD')}`,
      render: `${moment.unix(i).format('YYYYMMDD')}`,
    });
  }

  const columns = [
    {
      title: '城市',
      width: 80,
      fixed: 'left',
      align: 'center',
      render: 'areaName',
    },
    {
      title: '团队',
      width: 80,
      fixed: 'left',
      align: 'center',
      render: (d) => {
        if (d.teamId) {
          return d.teamId;
        }
        return 999;
      },

    },
    {
      title: '巡检资产数',
      width: 80,
      fixed: 'left',
      align: 'center',
      render: 'assetNum',

    },
    {
      title: '已完成',
      width: 80,
      fixed: 'left',
      align: 'center',
      render: 'finishCount',

    },
    {
      title: '未完成',
      width: 80,
      fixed: 'left',
      align: 'center',
      render: 'unfinishCount',

    },
    {
      title: '完成率',
      width: 80,
      fixed: 'left',
      align: 'center',
      render: d => `${Number(d.rate * 100).toFixed(2)}%`,

    },
    ...arr,
  ];

  const data = dataSource.map((v) => {
    const arrA = v.listDays.map(k => ({ [k.dataTime]: k.incrFinishCount }));
    return Object.assign({}, v, ...arrA);
  });
  return (
    <div>
      <Table
        bordered
        fixed="both"
        keygen="id"
        width={columns.length * 80}
        style={{ maxHeight: 400 }}
        columns={columns}
        data={data}
      />


    </div>
  );
};

List1.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default List1;
