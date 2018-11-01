import React from 'react';
import PropType from 'prop-types';
import { Table, Progress } from 'shineout';

const HeadTable = (props) => {
  const { headTable: { dataSource } } = props;
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
      render: 'devOnlineNum',
    },
    {
      title: '广告机在线率',
      render: 'onlineNumRate',
    },
    {
      title: '云运维FSU在线数',
      render: 'onlineNum',
    },
    {
      title: 'FSU在线率',
      render: 'onlineRate',
    },
    {
      title: 'FSU入网数',
      render: 'openNum',
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
