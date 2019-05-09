import { Modal, message } from 'antd';
import getParam from 'utils/getParam';
import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { initSuccess, searchSuccess } from './action';
import * as types from './types';
import { initSer, searchSer } from './server';

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
      dataIndex: 'colName',
    },
    {
      title: '计划完成',
      dataIndex: 'totalNum',
    },
    {
      title: '实际完成',
      dataIndex: 'finishNum',
    },
    {
      title: '完成率',
      dataIndex: 'finishRate',
    },
    {
      title: '人均工作量',
      dataIndex: 'staffAvgNum',
    },
  ];
  const exportExcel = () => {
    const option = {};
    option.fileName = `质检工单报表${(selectData.filter(v => v.taskId === selectValue)[0]).taskName}`;

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
