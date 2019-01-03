import React from 'react';
import { Table, Button } from 'shineout';

import Page from 'shein-lib/pagination';
import { openModal, finish, changePage, changePageSize } from '../action';


const List = (props) => {
  const { dispatch, dataSource, formData: { total, pageSize, pageNum } } = props;


  const columns =
    [
      {
        title: '创建时间',
        render: 'createTime',
        sorter: (order) => {
          console.log(order);
        },
      },
      {
        title: '创建人',
        render: 'createName',
      },
      {
        title: '处理人',
        render: 'handlePername',
      },
      {
        title: '省市区',
        render: 'areaDesc',
      },
      {
        title: '调度类型',
        render: 'dispatchTypeName',
      },
      {
        title: '任务等级',
        render: 'priorityDesc',
      },
      {
        title: '设备类型',
        render: 'deviceTypeName',
      },
      {
        title: '故障类型',
        render: 'faultDesc',
      },
      {
        title: '状态',
        render: 'statusDesc',
      },
      {
        title: '问题描述',
        render: 'description',
      },
      {
        title: '备注',
        render: 'content',
      },

      {
        title: '操作',
        render: d => (
          <div>
            <Button
              size="small"
              onClick={() => dispatch(openModal(d))}
            >详情
            </Button>
            <Button
              size="small"
              onClick={() => dispatch(finish(d))}
            >结束
            </Button>
          </div>
        ),
      },
    ];


  return (
    <div>
      <Table
        keygen="id"
        columns={columns}
        data={dataSource}
      />
      <Page
        total={total}
        onChange={(pageValue) => {
          dispatch(changePage(Object.assign({}, props, {
            formData: Object.assign({}, props.formData, {
              pageNum: pageValue,
            }),
          })));
        }}
        onShowSizeChange={(current, size) => {
          dispatch(changePageSize(Object.assign({}, props, {
            formData: Object.assign({}, props.formData, {
              pageSize: size,
            }),
          })));
        }}
        current={pageNum}
        pageSize={pageSize}
      />
    </div>
  );
};

export default List;
