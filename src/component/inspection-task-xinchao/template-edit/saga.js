import { Modal, message } from 'antd';
import { take, put, takeLatest } from 'redux-saga/effects';
import { searchSuccess, changePageSuccess, changePageSizeSuccess, openErrorModal } from './action';
import * as types from './types';
import { changePageSer, changePageSizeSer, searchSer, createSer } from './server';

const ExportJsonExcel = require('js-export-excel');


function* searchSaga(action) {
  const { props } = action;
  const data = yield searchSer(props);
  return yield put(searchSuccess(data));
}

function* changePageSaga(action) {
  const data = yield changePageSer(action);
  return yield put(changePageSuccess(data));
}

function* changePageSizeSaga(action) {
  const data = yield changePageSizeSer(action);
  return yield put(changePageSizeSuccess(data));
}

function* createSaga(action) {
  const data = yield createSer(action);
  if (data.errCode == 0) {
    if (data.data && data.data.length > 0) {
      return put(openErrorModal(data));
      const option = {};
      option.fileName = 'excel';
      option.datas = [
        {
          sheetData: data.data,
          sheetName: 'sheet',
          sheetFilter: ['itemName', 'propertyType', 'quantity'],
          sheetHeader: ['项目名称', '物业类型', '终端数'],
        },
        {
          sheetData: [{ one: '一行一列', two: '一行二列' }, { one: '二行一列', two: '二行二列' }],
        },
      ];

      const toExcel = new ExportJsonExcel(option); // new
      toExcel.saveExcel(); // 保存
      return message.error('部分失败的放入Excel');
    }
    return message.success('编辑成功');
  }
  return message.error(`${data.msg}`);
}

function* mainSaga() {
  yield takeLatest(types.search, searchSaga);
  yield takeLatest(types.changePage, changePageSaga);
  yield takeLatest(types.changePageSize, changePageSizeSaga);
  yield takeLatest(types.create, createSaga);
}

export default mainSaga;
