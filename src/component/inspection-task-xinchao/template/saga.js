import { Modal, message } from 'antd';
import assign from 'object-assign';
import { take, put, takeLatest } from 'redux-saga/effects';
import { initSuccess, openModalSuccess, updateSuccess, changeInspectPersonSuccess, openErrorModal } from './action';
import * as types from './types';
import { initSer, openModalSer, updateSer, changePageSer, changePageSizeSer, changeInspectPersonSer } from './server';

function* initSaga(action) {
  const { props } = action;
  const data = yield initSer(props);
  return yield put(initSuccess(data));
}

function* openModalSaga(action) {
  const { props } = action;
  const data = yield openModalSer(props);
  return yield put(openModalSuccess(data));
}

function* updateSaga(action) {
  const data = yield updateSer(action);
  if (data.errCode == 0) {
    yield put(updateSuccess(data));
    if (data.data && data.data.length > 0) {
      return yield put(openErrorModal(data));
    }
    return message.success('编辑成功');
  }
  return message.error(`${data.msg}`);
}

function* changePageSaga(action) {
  const data = yield changePageSer(action);
  return yield put(initSuccess(data));
}

function* changePageSizeSaga(action) {
  const data = yield changePageSizeSer(action);
  return yield put(initSuccess(data));
}

function* changeInspectPersonSaga(action) {
  const data = yield changeInspectPersonSer(action);
  return yield put(changeInspectPersonSuccess(data));
}


function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.openModal, openModalSaga);
  yield takeLatest(types.update, updateSaga);
  yield takeLatest(types.changePage, changePageSaga);
  yield takeLatest(types.changePageSize, changePageSizeSaga);
  yield takeLatest(types.changeInspectPerson, changeInspectPersonSaga);
}

export default mainSaga;
