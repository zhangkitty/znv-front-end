import React from 'react';
import { Modal, Table } from 'antd';
import { changeErrorModal } from '../action';

const tmp = (props) => {
  const { dispatch, errorModal: { visiable, dataSource } } = props;

  const columns = [
    {
      title: '项目名称',
      dataIndex: 'itemName',
      key: 'itemName',
    },
    {
      title: '物业类型',
      dataIndex: 'propertyType',
      key: 'propertyType',
    },
    {
      title: '终端数',
      dataIndex: 'quantity',
      key: 'quantity',
    },
  ];


  return (
    <div>
      <Modal
        title="失败的条目"
        visible={visiable}
        onCancel={() => dispatch(changeErrorModal('visiable', false))}
        footer={null}
      >
        <Table dataSource={dataSource} columns={columns} />
      </Modal>
    </div>
  );
};

export default tmp;
