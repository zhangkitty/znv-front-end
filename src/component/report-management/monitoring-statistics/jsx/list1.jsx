import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table } from 'shineout';

const List1 = (props) => {
  const {
    list,
    dataLoading,
    dataSource,
  } = props;

  const arr = [];

  // if (moment(choosedMonth, 'YYYYMM').daysInMonth() && dataSource.length > 0) {
  //   for (let i = 0; i < moment(choosedMonth, 'YYYYMM').daysInMonth(); i++) {
  //     arr.push({
  //       title: `${i + 1}号接收资产数`,
  //       width: 100,
  //       render: `${moment(choosedMonth).format('YYYY')}${i + 1}`,
  //     });
  //   }
  // }


  for (let i = props.formData.kkk[0].unix(); i <= props.formData.kkk[1].unix(); i += 3600 * 24) {
    arr.push({
      title: `${moment.unix(i).format('YYYY-MM-DD')}`,
      render: `${moment.unix(i).format('YYYYMMDD')}`,
      width: 80,
    });
  }


  const columns = [
    {
      title: '城市',
      width: 80,
      fixed: 'left',
      render: 'areaCode',
    },
    {
      title: '投放数',
      width: 80,
      fixed: 'left',
      render: 'deliverySuccessCount',

    },
    {
      title: '应投数',
      width: 80,
      fixed: 'left',

    },
    {
      title: '实投数',
      width: 80,
      fixed: 'left',
      render: 'deliverySuccessCount',

    },
    {
      title: '已监播数',
      width: 80,
      fixed: 'left',
      render: 'finishCount',

    },
    {
      title: '未监播数',
      width: 80,
      fixed: 'left',
      render: 'unfinishCount',

    },
    {
      title: '完成进度',
      width: 80,
      fixed: 'left',

    },
    ...arr,
  ];

  const data = dataSource.map((v) => {
    const arrA = v.listDays.map(k => ({ [k.dataTime]: k.finishCount }));
    return Object.assign({}, v, ...arrA);
  });
  return (
    <div>
      <Table
        bordered
        fixed="both"
        keygen="id"
        width={5000}
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