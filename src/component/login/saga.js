import { put, takeLatest } from 'redux-saga/effects';
import { initSuccess, onHoverSuccess } from './action';
import * as types from './types';
import { initSer, onHoverSer } from './server';


function* initSaga(action) {
  const data = yield initSer(action.props);
  yield put(initSuccess(data, action.props));
  return null;
}


function* onHoverSaga(action) {
  const data = yield onHoverSer(action);

  yield put(onHoverSuccess(data));
}

function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.onHover, onHoverSaga);
}

export default mainSaga;
