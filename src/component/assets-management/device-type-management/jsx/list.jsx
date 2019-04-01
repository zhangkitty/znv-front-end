import React from 'react';
import { Table } from 'antd';
import { Button } from 'shineout';
import { changeModalValue, deleteDeviceType } from '../action';


const list = (props) => {
  console.log(1);
  const { dispatch, dataSource, loading } = props;

  const columns = [{
    title: '设备类型',
    dataIndex: 'deviceTypeName',
    key: 'deviceTypeName',
    align: 'center',
  },
  {
    align: 'center',
    title: '是否主设备',
    dataIndex: 'isPrimary',
    key: 'isPrimary',
    render: (text, record, index) => {
      if (text === '1') {
        return '是';
      }
      return '否';
    },
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
            dispatch(changeModalValue('deviceType', record.deviceType));
            dispatch(changeModalValue('deviceTypeName', record.deviceTypeName));
            dispatch(changeModalValue('isPrimary', record.isPrimary));
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
