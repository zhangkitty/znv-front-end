import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'shineout';
import { Icon } from 'antd';
import { compare } from 'utils/compare';


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
            workNumInc: compare(v.workNum, dataSource[1].workNum),
            workRateInc: compare(v.workRate, dataSource[1].workRate),
            workTimeInc: compare(v.workTime, dataSource[1].workTime),
            workDistanceInc: compare(v.workDistance, dataSource[1].workDistance),
          });
        }
        return v;
      });
    }
  }
  const renderIcon = (str) => {
    console.log(str);
    if (str === '>') {
      return <Icon type="arrow-up" />;
    }
    if (str === '<') {
      return <Icon type="arrow-down" />;
    }
    return '';
  };

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
              {renderIcon(d.workNumInc)}
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
              {renderIcon(d.workRateInc)}
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
              {renderIcon(d.workTimeInc)}
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
              {renderIcon(d.workDistanceInc)}
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
              {renderIcon(d.workTimeInc)}
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
              {renderIcon(d.workDistance)}
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
        data={mydataSource}
        columns={len > 3 ? columns1 : columns}
      />

    </div>
  );
};

export default HeadTable;
