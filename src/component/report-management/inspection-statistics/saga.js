import { Modal, message } from 'antd';
import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { initSet, searchSet, handleSet, initSuccess, submitSuccess } from './action';
import * as types from './types';
import { pickingList, pickingListDelete, generate, initSer, submitSer } from './server';

function* init(action) {
  const data = yield initSer(action.props);
  if (!data[0].success) {
    return message.msg;
  }
  if (!data[1].success) {
    return message.msg;
  }
  if (!data[2].success) {
    return message.msg;
  }
  yield put(initSuccess(data));
  return null;
}
function* search(action) {
  const data = yield pickingList(action.props);
  if (data.code === 0) {
    yield put(searchSet(data.info));
  } else {
    Modal.error({ title: data.msg });
  }
}
function* handle(action) {
  let data;
  if (action.types === '1') {
    data = yield generate({
      handle_list: action.idList,
      processing_plant: action.processing_plant,
    });
  } else {
    data = yield pickingListDelete({ handle_list: action.idList });
  }
  if (data.code === 0) {
    yield put(handleSet(action.types));
  } else {
    Modal.error({ title: data.msg });
  }
}

function* submit(action) {
  const { props } = action;
  if (!props.formData.kkk[0]) {
    return message.error('统计时间不能为空');
  }
  if (!props.formData.kkk[1]) {
    return message.error('统计时间不能为空');
  }
  const data = yield submitSer(action.props);
  if (!data.success) {
    return message.error(data.msg);
  }
  yield put(submitSuccess(data.data));
  return null;
}

function* mainSaga() {
  yield takeLatest(types.init, init);
  yield takeLatest(types.submit, submit);
  yield takeLatest(types.search, search);
  yield takeLatest(types.handle, handle);
}

export default mainSaga;
