import { Modal, message } from 'antd';
import { take, put, takeLatest } from 'redux-saga/effects';
import { searchSuccess, openModalSuccess, queryTaskDetailSuccess, createTaskSuccess, initSuccess, openErrorModal } from './action';
import * as types from './types';
import { initSer, searchSer, changePageSer, changePageSizeSer, openModalSer, queryTaskDetailSer, createTaskSer, updateSer } from './server';

function* initSaga(action) {
  const data = yield initSer(action);
  return yield put(initSuccess(data));
}

function* searchSaga(action) {
  const { props } = action;
  const data = yield searchSer(props);
  return yield put(searchSuccess(data));
}

function* changePageSaga(action) {
  const data = yield changePageSer(action);
  return yield put(searchSuccess(data));
}

function* changePageSizeSaga(action) {
  const data = yield changePageSizeSer(action);
  return yield put(searchSuccess(data));
}

function* openModalSaga(action) {
  const data = yield openModalSer(action);
  return yield put(openModalSuccess(data));
}

function* queryTaskDetailSaga(action) {
  const data = yield queryTaskDetailSer(action);
  return yield put(queryTaskDetailSuccess(data));
}

function* createTaskSaga(action) {
  const data = yield createTaskSer(action);
  if (data.errCode == 0) {
    message.success('成功');
  }
  if (data.errCode != 0) {
    return message.error(data.msg);
  }
  return null;
}


function* updateSaga(action) {
  const data = yield updateSer(action);
  if (data.errCode == 0) {
    yield put(createTaskSuccess(data));
    if (data.data && data.data.length > 0) {
      debugger;
      return yield put(openErrorModal(data));
    }
    return message.success('编辑成功');
  }
  return message.error(`${data.msg}`);
}

function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.search, searchSaga);
  yield takeLatest(types.changePage, changePageSaga);
  yield takeLatest(types.changePageSize, changePageSizeSaga);
  yield takeLatest(types.openModal, openModalSaga);
  yield takeLatest(types.queryTaskDetail, queryTaskDetailSaga);
  yield takeLatest(types.createTask, createTaskSaga);
  yield takeLatest(types.update, updateSaga);
}

export default mainSaga;
