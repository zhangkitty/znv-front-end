import { Modal, message } from 'antd';
import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { initSuccess, searchSuccess } from './action';
import * as types from './types';
import { initSer, searchSer } from './server';
import getParam from 'utils/getParam';


function* initSaga(action) {
  const { props } = action;
  const data = yield initSer(props);
  return yield put(initSuccess(data));
}

function* exportExcelSaga(action) {
  const { props } = action;
  const { formData, selectData } = props;
  const data = {
    taskId: props.params.taskId,
    taskName: (selectData.filter(v => v.taskId === formData.selectValue)[0]).taskName,
    regionCode: props.params.regionCode,
  };
  console.log(`${process.env.BASE_URI}/rqs/xc/patrolrate/download${getParam(data)}`, '[]');
  window.location.href = `${process.env.BASE_URI}/rqs/xc/patrolrate/download${getParam(data)}`;
  return null;
}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.exportExcel, exportExcelSaga);
}

export default mainSaga;
