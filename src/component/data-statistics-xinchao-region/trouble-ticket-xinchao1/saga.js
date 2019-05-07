import { Modal, message } from 'antd';
import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { initSuccess, searchSuccess } from './action';
import * as types from './types';
import { initSer, searchSer } from './server';
import getParam from 'utils/getParam';

const ExportJsonExcel = require('js-export-excel');

function* initSaga(action) {
  const { props } = action;
  const data = yield initSer(props);
  return yield put(initSuccess(data));
}

function exportExcelSaga(action) {
  const { props: { dataSource, selectData, formData: { selectValue } } } = action;
  const columns = [
    {
      title: '产品中心',
      dataIndex: 'groupName',
    },
    {
      title: '新增故障工单数',
      dataIndex: 'totalNum',
    },
    {
      title: '未关闭工单数',
      dataIndex: 'notClosedNum',
    },
    {
      title: '关闭工单数',
      dataIndex: 'closedNum',
    },
    {
      title: '超时工单数',
      dataIndex: 'expiredNum',
    },
    {
      title: '平均处理时长',
      dataIndex: 'avgExecuteTime',
    },
    {
      title: '故障率',
      dataIndex: 'faultRate',
    },
  ];
  const exportExcel = () => {
    const option = {};
    option.fileName = (selectData.filter(v => v.taskId === selectValue)[0]).taskName;
    option.datas = [
      {
        sheetData: dataSource,
        sheetName: 'sheet',
        sheetFilter: columns.map(v => v.dataIndex),
        sheetHeader: columns.map(v => v.title),
      },
    ];
    const toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  };
  exportExcel(dataSource);
  return null;
}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.exportExcel, exportExcelSaga);
}

export default mainSaga;
