import { takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';
import * as types from './types';
import { initSer, searchSer, changeFourSer, changeProvinceSer, changeCitySer, outSer, openModalSer, finishSer } from './server';
import { initSuccess, changeFourSuccess, changeProviceSuccess, changeCitySuccess, searchSuccess, openModalSuccess } from './action';


function* initSaga(action) {
  const data = yield initSer(action.props);
  return yield put(initSuccess(data));
}

function* changeFourSaga(action) {
  const data = yield changeFourSer(action.d);
  return yield put(changeFourSuccess(data));
}

function* changeProvinceSaga(action) {
  const data = yield changeProvinceSer(action.d);
  return yield put(changeProviceSuccess(data));
}

function* changeCitySaga(action) {
  const data = yield changeCitySer(action.d);
  return yield put(changeCitySuccess(data));
}

function* searchSaga(action) {
  const data = yield searchSer(action.props);

  return yield put(searchSuccess(data));
}


function* outSaga(action) {
  const data = yield outSer(action.props);
  return null;
}

function* openModalSaga(action) {
  const data = yield openModalSer(action.d);

  return yield put(openModalSuccess(data));
}

function* finishSaga(action) {
  const data = yield finishSer(action.d);
  if (data === 'REMOVE_TASK_SUCCESS') {
    return message.success('成功');
  }
  if (data === 'REMOVE_TASK_FAIL') {
    return message.error('失败');
  }
  return null;
}

function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.changeFour, changeFourSaga);

  yield takeLatest(types.changeProvince, changeProvinceSaga);
  yield takeLatest(types.changeCity, changeCitySaga);

  yield takeLatest(types.search, searchSaga);
  yield takeLatest(types.out, outSaga);

  yield takeLatest(types.openModal, openModalSaga);

  yield takeLatest(types.finish, finishSaga);

  yield takeLatest(types.changePage, searchSaga);
  yield takeLatest(types.changePageSize, searchSaga);
}

export default mainSaga;
