import { Modal, message } from 'antd';
import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { initSet, searchSet, handleSet, submitSuccess } from './action';
import * as types from './types';
import { pickingList, pickingListDelete, generate, submitSer } from './server';

function* init() {
  while (true) {
    const action = yield take(types.init);
    const data = yield pickingList(action.props);
    if (data.code === 0) {
      yield put(initSet(data.info));
    } else {
      Modal.error({ title: data.msg });
    }
  }
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
  if (data.errCode !== 0) {
    return message.error(data.msg);
  }
  yield put(submitSuccess(data.data));
  return null;
}

function* mainSaga() {
  yield fork(init);

  yield takeLatest(types.submit, submit);
  yield takeLatest(types.search, search);
  yield takeLatest(types.handle, handle);
  yield takeLatest(types.changePage, submit);
  yield takeLatest(types.changePageSize, submit);
}

export default mainSaga;
