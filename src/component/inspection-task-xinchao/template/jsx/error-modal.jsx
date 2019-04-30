import React from 'react';
import { Modal, Table, Button } from 'antd';
import { changeErrorModal } from '../action';

const ExportJsonExcel = require('js-export-excel');


const exportExcel = (data) => {
  const option = {};
  option.fileName = 'excel';
  option.datas = [
    {
      sheetData: data,
      sheetName: 'sheet',
      sheetFilter: ['itemName', 'propertyType', 'quantity'],
      sheetHeader: ['项目名称', '物业类型', '终端数'],
    },
  ];

  const toExcel = new ExportJsonExcel(option); // new
  toExcel.saveExcel(); // 保存
};

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
        <Button
          style={{ marginBottom: 5 }}
          onClick={() => {
            exportExcel(dataSource);
          }}
        >
          导出失败的条目
        </Button>
        <Table dataSource={dataSource} columns={columns} />
      </Modal>
    </div>
  );
};

export default tmp;
