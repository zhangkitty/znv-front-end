import React from 'react';
import PropType from 'prop-types';
import { Table } from 'shineout';

const HeadTable = (props) => {
  console.log(props);

  const columns = [
    {
      title: '',
    },
    {
      title: '广告机总数',
    },
    {
      title: '广告机在线数',
    },
    {
      title: '广告机在线率',
    },
    {
      title: '云运维FSU在线数',
    },
    {
      title: 'FSU在线率',
    },
    {
      title: 'FSU入网数',
    },
    {
      title: '入网进度',
    },
  ];

  return (
    <div>
      <Table
        keygen="id"
        data={[]}
        columns={columns}
      />

    </div>
  );
};

export default HeadTable;
