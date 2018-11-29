import React from 'react';
import PropType from 'prop-types';
import { Table, Progress } from 'shineout';
import { Icon } from 'antd';

const HeadTable = (props) => {
  const { onlineRate: { headTable: { dataSource } } } = props;


  const mydataSource = dataSource;
  if (Array.isArray(dataSource)) {
    if (dataSource.length === 2) {
      dataSource.map((v, idx) => {
        if (idx === 0) {
          Object.assign({}, v, {
            devOnlineNumInc: v.devOnlineNum > dataSource[1].devOnlineNum,
            onlineNumRateInc: v.onlineNumRate > dataSource[1].onlineNumRate,
            onlineNumInc: v.onlineNum > dataSource[1].onlineNum,
            onlineRateInc: v.onlineRate > dataSource[1].onlineRate,
            openNumInc: v.openNum > dataSource[1].openNum,
          });
        } else {
          return v;
        }
      });
    }
  }
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
        if (idx === 1) {
          return <span>{d.devOnlineNum}{d.devOnlineNumInc ? <Icon type="rise" /> : <Icon type="fall" />}</span>;
        }
        return <span>{d.devOnlineNum}</span>;
      },
    },
    {
      title: '广告机在线率',
      render: (d, idx) => {
        if (idx === 1) {
          return <span>{ `${Number(d.onlineNumRate * 100).toFixed(2)}%`}{d.onlineNumRateInc ? <Icon type="rise" /> : <Icon type="fall" />}</span>;
        }
        return <span>{d.onlineNumRate}</span>;
      },

    },
    {
      title: '云运维FSU在线数',
      render: (d, idx) => {
        if (idx === 1) {
          return <span>{d.onlineNum}{d.onlineNumInc ? <Icon type="rise" /> : <Icon type="fall" />}</span>;
        }
        return <span>{d.onlineNum}</span>;
      },
    },
    {
      title: 'FSU在线率',
      render: (d, idx) => {
        if (idx === 1) {
          return <span>{ `${Number(d.onlineRate * 100).toFixed(2)}%`}{d.onlineRateInc ? <Icon type="rise" /> : <Icon type="fall" />}</span>;
        }
        return <span>{d.onlineRateInc}</span>;
      },
    },
    {
      title: 'FSU入网数',
      render: (d, idx) => {
        if (idx === 1) {
          return <span>{d.openNum}{d.openNumInc ? <Icon type="rise" /> : <Icon type="fall" />}</span>;
        }
        return <span>{d.openNum}</span>;
      },
    },
    {
      title: '入网进度',
      render: d => (
        <Progress style={{ width: 100 }} value={d.openRate * 100}>{`${d.openRate * 100}%`}</Progress>
      ),
    },
  ];

  return (
    <div>
      <Table
        keygen="id"
        data={dataSource}
        columns={columns}
        virticalAlign="middle"
      />

    </div>
  );
};

export default HeadTable;
