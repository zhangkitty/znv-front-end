import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'shineout';
import { Icon } from 'antd';

const HeadTable = (props) => {
  const { staffAttendance: { headTable: { dataSource } } } = props;
  const { node } = props;
  const len = node.id.split('.').length;

  let mydataSource = dataSource;
  if (Array.isArray(dataSource)) {
    if (dataSource.length === 2) {
      mydataSource = dataSource.map((v, idx) => {
        if (idx === 0) {
          return Object.assign({}, v, {
            workNumInc: v.workNumInc > dataSource[1].workNumInc,
            workRateInc: v.workRateInc > dataSource[1].workRateInc,
            workTimeInc: v.workTime > dataSource[1].workTime,
            workDistanceInc: v.workDistance > dataSource[1].workDistance,
          });
        }
        return v;
      });
    }
  }
  const columns = [
    {
      title: '    ',
      render: 'dataTime',
    },
    {
      title: '总人数',
      render: 'totalNum',
    },
    {
      title: '出勤人数',
      render: (d, idx) => {
        if (idx === 0) {
          return (
            <div>
              <span>{d.workNum}</span>
              {d.workNumInc ? <Icon type="arrow-up" /> : <Icon type="arrow-down" />}
            </div>
          );
        }
        return <span>{d.workNum}</span>;
      },
    },
    {
      title: '出勤率',
      render: (d, idx) => {
        if (idx === 0) {
          return (
            <div>
              <span>{`${Number((Math.round(d.workRate * 10000) / 100)).toFixed(2)}%`}</span>
              {d.workRateInc ? <Icon type="arrow-up" /> : <Icon type="arrow-down" />}
            </div>
          );
        }
        return <span>{`${Number((Math.round(d.workRate * 10000) / 100)).toFixed(2)}%`}</span>;
      },
    },


    {
      title: '平均工时/h',
      render: (d, idx) => {
        if (idx === 0) {
          return (
            <div>
              <span>{`${Number((Math.round(d.workTime * 100) / 100)).toFixed(2)}h`}</span>
              {d.workTimeInc ? <Icon type="arrow-up" /> : <Icon type="arrow-down" />}
            </div>
          );
        }
        return <span>{`${Number((Math.round(d.workTime * 100) / 100)).toFixed(2)}h`}</span>;
      },
    },
    {
      title: '工作路程/km',
      render: (d, idx) => {
        if (idx === 0) {
          return (
            <div>
              <span>{`${Number((Math.round(d.workDistance * 100) / 100)).toFixed(2)}km`}</span>
              {d.workDistance ? <Icon type="arrow-up" /> : <Icon type="arrow-down" />}
            </div>
          );
        }
        return <span>{`${Number((Math.round(d.workDistance * 100) / 100)).toFixed(2)}km`}</span>;
      },

    },
  ];
  const columns1 = [
    {
      title: '    ',
      render: 'dataTime',
    },
    {
      title: '是否出勤',
      render: d => (Number(d.workTime) > 0 ? '是' : '否'),

    },
    {
      title: '工作时长',
      render: (d, idx) => {
        if (idx === 0) {
          return (
            <div>
              <span>{`${Number((Math.round(d.workTime * 100) / 100)).toFixed(2)}h`}</span>
              {d.workTimeInc ? <Icon type="arrow-up" /> : <Icon type="arrow-down" />}
            </div>
          );
        }
        return <span>{`${Number((Math.round(d.workTime * 100) / 100)).toFixed(2)}h`}</span>;
      },
    },
    {
      title: '工作路程',
      render: (d, idx) => {
        if (idx === 0) {
          return (
            <div>
              <span>{`${Number((Math.round(d.workDistance * 100) / 100)).toFixed(2)}km`}</span>
              {d.workDistance ? <Icon type="arrow-up" /> : <Icon type="arrow-down" />}
            </div>
          );
        }
        return <span>{`${Number((Math.round(d.workDistance * 100) / 100)).toFixed(2)}km`}</span>;
      },

    },
  ];
  return (
    <div>
      <Table
        keygen="id"
        data={dataSource}
        columns={len > 3 ? columns1 : columns}
      />

    </div>
  );
};

export default HeadTable;
