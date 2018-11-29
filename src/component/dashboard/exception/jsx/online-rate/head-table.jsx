import React from 'react';
import PropType from 'prop-types';
import { Table, Progress } from 'shineout';
import { Icon } from 'antd';
import { compare } from 'utils/compare';

const HeadTable = (props) => {
  const { onlineRate: { headTable: { dataSource } } } = props;


  let mydataSource = dataSource;
  if (Array.isArray(dataSource)) {
    if (dataSource.length === 2) {
      mydataSource = dataSource.map((v, idx) => {
        if (idx === 0) {
          return Object.assign({}, v, {
            devOnlineNumInc: compare(v.devOnlineNum, dataSource[1].devOnlineNum),
            onlineNumRateInc: compare(v.onlineNumRate, dataSource[1].onlineNumRate),
            onlineNumInc: compare(v.onlineNum, dataSource[1].onlineNum),
            onlineRateInc: compare(v.onlineRate, dataSource[1].onlineRate),
            openNumInc: compare(v.openNum, dataSource[1].openNum),
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
      title: '     ',
      render: 'dataTime',
    },
    {
      title: '广告机总数',
      render: 'devTotal',
    },
    {
      title: '广告机在线数',
      render: (d, idx) => {
        if (idx === 0) {
          return (
            <div>
              <span>{d.devOnlineNum}</span>
              {renderIcon(d.devOnlineNumInc)}
            </div>
          );
        }
        return <span>{d.devOnlineNum}</span>;
      },
    },
    {
      title: '广告机在线率',
      render: (d, idx) => {
        if (idx === 0) {
          return <span>{ `${Number(d.onlineNumRate * 100).toFixed(2)}%`}{renderIcon(d.onlineNumRateInc) }</span>;
        }
        return <span>{ `${Number(d.onlineNumRate * 100).toFixed(2)}%`}</span>;
      },

    },
    {
      title: '云运维FSU在线数',
      render: (d, idx) => {
        if (idx === 0) {
          return <span>{d.onlineNum}{d.onlineNumInc ? <Icon type="arrow-up" /> : <Icon type="arrow-down" />}</span>;
        }
        return <span>{d.onlineNum}</span>;
      },
    },
    {
      title: 'FSU在线率',
      render: (d, idx) => {
        if (idx === 0) {
          return <span>{ `${Number(d.onlineRate * 100).toFixed(2)}%`}{renderIcon(d.onlineRateInc) }</span>;
        }
        return <span>{`${Number(d.onlineRate * 100).toFixed(2)}%`}</span>;
      },
    },
    {
      title: 'FSU入网数',
      render: (d, idx) => {
        if (idx === 0) {
          return <span>{d.openNum}{renderIcon(d.openNumInc) }</span>;
        }
        return <span>{d.openNum}</span>;
      },
    },
    {
      title: '入网进度',
      render: d => (
        <Progress style={{ width: 100 }} value={d.openRate * 100}>{`${Number(d.openRate * 100).toFixed(2)}%`}</Progress>
      ),
    },
  ];

  return (
    <div>
      <Table
        keygen="id"
        data={mydataSource}
        columns={columns}
        virticalAlign="middle"
      />

    </div>
  );
};

export default HeadTable;
