import React from 'react';
import assign from 'object-assign';
import { Table } from 'antd';
import Page from 'shein-lib/pagination';
import { changePage, changePageSize } from '../action';


const tmp = (props) => {
  console.log(props);

  const {
    dispatch, dataSource, ready, total,
    formData: { pageNum, pageSize },
  } = props;


  const columns = [
    {
      title: '资产ID',
      dataIndex: 'assetNumber',
      key: 'assetNumber',
    },
    {
      title: '商家名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '设备编号',
      dataIndex: 'sbbm',
      key: 'sbbm',
    },
    {
      title: '省市区',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: '商家地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '联系人',
      dataIndex: 'managerName',
      key: 'managerName',
    },
    {
      title: '联系电话',
      dataIndex: 'managerPhone',
      key: 'managerPhone',
    },
    {
      title: '接收人',
      dataIndex: 'checkerName',
      key: 'checkerName',
    },
    {
      title: '交接时间',
      dataIndex: 'handovertime',
      key: 'handovertime',
    },
    {
      title: '验收时间',
      dataIndex: 'acceptdate',
      key: 'acceptdate',
    },
  ];
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        loading={!ready}
      />

      <Page
        total={total}
        current={pageNum}
        pageSize={pageSize}
        onChange={current => dispatch(changePage(assign({}, props, {
            formData: assign({}, props.formData, {
              pageNum: current,
            }),
          })))}


        onShowSizeChange={(current, size) => dispatch(changePageSize(assign({}, props, {
          formData: assign({}, props.formData, {
            pageNum: current,
            pageSize: size,
          }),
        })))}
      />
    </div>
  );
};
export default tmp;
