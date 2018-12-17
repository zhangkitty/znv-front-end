import { takeLatest, put } from 'redux-saga/effects';
import * as types from './types';
import { initSer, searchSer, changeFourSer, changeProvinceSer, changeCitySer, outSer } from './server';
import { initSuccess, changeFourSuccess, changeProviceSuccess, changeCitySuccess, searchSuccess } from './action';


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
}

function* mainSaga() {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.changeFour, changeFourSaga);

  yield takeLatest(types.changeProvince, changeProvinceSaga);
  yield takeLatest(types.changeCity, changeCitySaga);

  yield takeLatest(types.search, searchSaga);
  yield takeLatest(types.out, outSaga);
}

export default mainSaga;
