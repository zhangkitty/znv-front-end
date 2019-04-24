import { Modal, message } from 'antd';
import { take, put, takeLatest } from 'redux-saga/effects';
import { searchSuccess, openModalSuccess, queryTaskDetailSuccess, createTaskSuccess ,createTaskError} from './action';
import * as types from './types';
import { searchSer, changePageSer, changePageSizeSer, openModalSer, queryTaskDetailSer, createTaskSer } from './server';

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
    message.error(data.msg);
    return yield put(createTaskError(data));
  }
  return yield put(createTaskSuccess(data));
}


function* mainSaga() {
  yield takeLatest(types.search, searchSaga);
  yield takeLatest(types.changePage, changePageSaga);
  yield takeLatest(types.changePageSize, changePageSizeSaga);
  yield takeLatest(types.openModal, openModalSaga);
  yield takeLatest(types.queryTaskDetail, queryTaskDetailSaga);
  yield takeLatest(types.createTask, createTaskSaga);
}

export default mainSaga;
