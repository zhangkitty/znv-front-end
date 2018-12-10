import React from 'react';
import Table from 'shineout';


const List = (props) => {
  console.log(props);


  const columns =
    [
      // {
      //   title: '创建时间',
      // },
      // {
      //   title: '创建人',
      // },
      // {
      //   title: '处理人',
      // },
      // {
      //   title: '省市区',
      // },
      // {
      //   title: '调度类型',
      // },
      // {
      //   title: '任务等级',
      // },
      // {
      //   title: '设备类型',
      // },
      // {
      //   title: '故障类型',
      // },
      // {
      //   title: '状态',
      // },
      // {
      //   title: '问题描述',
      // },
      // {
      //   title: '备注',
      // },

      {
        title: '操作',
      },
    ];
  return (
    <div>
      <Table
        keygen="id"
        width={1500}
        columns={columns}
        data={[]}
      />
    </div>
  );
};

export default List;
