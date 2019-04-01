import React from 'react';
import { Table } from 'antd';
import { Button } from 'shineout';
import { changeModalValue, deleteDeviceType } from '../action';


const list = (props) => {
  const { dispatch, dataSource, loading } = props;

  const columns = [{
    title: '项目名称',
    dataIndex: 'projectName',
    key: 'projectName',
    align: 'center',
  },
  {
    align: 'center',
    title: '公司全名',
    dataIndex: 'customerName',
    key: 'customerName',
  },
  {
    align: 'center',
    title: '操作',
    dataIndex: 'address',
    key: 'address',
    render: (text, record, index) => (
      <div>
        <Button
          type="link"
          onClick={() => {
            dispatch(changeModalValue('addOrEdit', 'edit'));
            dispatch(changeModalValue('projectCode', record.projectCode));
            dispatch(changeModalValue('projectName', record.projectName));
            dispatch(changeModalValue('company', record.customerName));
            dispatch(changeModalValue('visiable', true));
          }}
        >编辑
        </Button>
        <Button
          type="link"
          onClick={(text, recode) => {
                  dispatch(deleteDeviceType(props, record.deviceType));
                }}
        >删除
        </Button>
      </div>
    ),
  }];


  return (
    <div style={{ marginTop: 10, marginRight: 10 }}>
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={!loading}
      />
    </div>
  );
};

export default list;
