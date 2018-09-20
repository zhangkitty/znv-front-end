import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'shineout';


const List2 = (props) => {
  const {
    list,
    dataLoading,
    dataSource,
  } = props;


  const arr = [

  ];

  if (dataSource[0]) {
    dataSource[0].listDays.map((v, idx) => {
      arr.push(...[
        {
          title: '工单',
          group: `${idx + 1}号处理点位数`,
          render: `areaCode-${idx}`,
        },
        {
          title: '资产',
          group: `${idx + 1}号处理点位数`,
          render: `areaCode-${idx}`,
        },
        {
          title: '巡检',
          group: `${idx + 1}号处理点位数`,
          render: `areaCode-${idx}`,
        },
        {
          title: '监播',
          group: `${idx + 1}号处理点位数`,
          render: `areaCode-${idx}`,
        },
      ]);
    });
  }


  const columns = [
    {
      title: '运维人员',
      fixed: 'left',
      render: 'dataTime',
      width: 100,
    },
    {
      title: '城市',
      fixed: 'left',
      render: 'areaCode',
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
      render: 'teamId',
      width: 110,
    },
    {
      title: '当月出勤天数',
      fixed: 'right',
      render: 'teamId',
      width: 110,
    },
    {
      title: '日均处理数',
      fixed: 'right',
      render: 'teamId',
      width: 100,
    },
  ];

  const newDataSource = dataSource.map((v) => {
    const a = {};
    const arr = v.listDays.map((k, idx) => {
      for (const [key, value] of Object.entries(k)) {
        a[`${key}-${idx}`] = value;
      }
    });
    // debugger;
    const obj = Object.assign({}, v, a);
    return obj;
  });
  console.log(newDataSource);
  return (
    <div>
      <Table
        bordered
        fixed="both"
        keygen="id"
        width={2000}
        columns={columns}
        data={newDataSource}
      />
    </div>
  );
};

List2.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default List2;
