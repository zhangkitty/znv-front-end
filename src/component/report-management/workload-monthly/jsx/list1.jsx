import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Button } from 'shineout';


const List1 = (props) => {
  const {
    list,
    dataLoading,
    dataSource,
    formData,
  } = props;


  const arr = [

  ];

  // if (dataSource[0]) {
  //   dataSource[0].listDays.map((v, idx) => {
  //     arr.push(...[
  //       {
  //         title: '工单',
  //         group: `${idx + 1}号处理点位数`,
  //         render: `areaCode-${idx}`,
  //       },
  //       {
  //         title: '资产',
  //         group: `${idx + 1}号处理点位数`,
  //         render: `areaCode-${idx}`,
  //       },
  //       {
  //         title: '巡检',
  //         group: `${idx + 1}号处理点位数`,
  //         render: `areaCode-${idx}`,
  //       },
  //       {
  //         title: '监播',
  //         group: `${idx + 1}号处理点位数`,
  //         render: `areaCode-${idx}`,
  //       },
  //     ]);
  //   });
  // }


  // {
  //   title: `${i + 1}号接收资产数`,
  //     width: 100,
  //   render: `${moment(choosedMonth).format('YYYY')}${i + 1}`,
  // }

  if (moment(formData.choosedMonth, 'YYYYMM').daysInMonth() && dataSource.length > 0) {
    for (let i = 0; i < moment(formData.choosedMonth, 'YYYYMM').daysInMonth(); i++) {
      arr.push(...[
        {
          title: '工单',
          width: 40,
          group: `${i + 1}号处理点位数`,
          render: d => (d[`${moment(formData.choosedMonth).format('YYYY')}${`000${i + 1}`.substr(-2)}`]) && (d[`${moment(formData.choosedMonth).format('YYYY')}${`000${i + 1}`.substr(-2)}`]).incrOrder,

        },
        {
          title: '资产',
          width: 40,
          group: `${i + 1}号处理点位数`,
          render: d => (d[`${moment(formData.choosedMonth).format('YYYY')}${`000${i + 1}`.substr(-2)}`]) && (d[`${moment(formData.choosedMonth).format('YYYY')}${`000${i + 1}`.substr(-2)}`]).incrAcceptedAsset,
        },
        {
          title: '巡检',
          width: 40,
          group: `${i + 1}号处理点位数`,
          render: d => (d[`${moment(formData.choosedMonth).format('YYYY')}${`000${i + 1}`.substr(-2)}`]) && (d[`${moment(formData.choosedMonth).format('YYYY')}${`000${i + 1}`.substr(-2)}`]).patrolFinishCount,
        },
        {
          title: '监播',
          width: 40,
          group: `${i + 1}号处理点位数`,
          render: d => (d[`${moment(formData.choosedMonth).format('YYYY')}${`000${i + 1}`.substr(-2)}`]) && (d[`${moment(formData.choosedMonth).format('YYYY')}${`000${i + 1}`.substr(-2)}`]).monitorFinishCount,
        },
      ]);
    }
  }


  const columns = [
    {
      title: '城市',
      fixed: 'left',
      render: 'areaName',
      width: 100,
    },
    {
      title: '团队',
      fixed: 'left',
      render: 'teamId',
      width: 100,
    },
    ...arr,
    {
      title: '当月处理总数',
      fixed: 'right',
      render: 'monthTotalNum',
      width: 110,
    },
    {
      title: '当月出勤天数',
      fixed: 'right',
      render: 'presentDays',
      width: 110,
    },
    {
      title: '日均处理数',
      fixed: 'right',
      width: 100,
      render: (d) => {
        if (+d.presentDays == 0) {
          return 0;
        }
        return Number(d.monthTotalNum / d.presentDays).toFixed(2);
      },
    },
  ];

  const newDataSource = dataSource.map((v) => {
    const arrA = v.listDays.map(k => ({
      [k.dataTime]: {
        incrAcceptedAsset: k.incrAcceptedAsset,
        incrOrder: k.incrOrder,
        monitorFinishCount: k.monitorFinishCount,
        patrolFinishCount: k.patrolFinishCount,
      },
    }));
    return Object.assign({}, v, ...arrA);
  });
  return (
    <div>
      <Table
        bordered
        fixed="both"
        keygen="id"
        width={6000}
        columns={columns}
        data={newDataSource}
      />
    </div>
  );
};

List1.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default List1;
