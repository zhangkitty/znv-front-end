// import hashHistory from 'shein-lib/history';
import { push } from 'react-router-redux';
import { takeLatest, put } from 'redux-saga/effects';
import * as types from './types';
import { serachSer, initSer, changeCitySer } from './server';
import { searchSuccess, initSerSuccess, changeCitySuccess } from './actions';
import assign from 'object-assign';


function* initSaga(action) {
  const { props } = action;
  const data = yield initSer(props);
  yield put(initSerSuccess(data));
  return null;
}

function* changeCitySaga(action) {
  const { props, d } = action;
  const data = yield changeCitySer({ props, d });
  yield put(changeCitySuccess(data));
  return null;
}

function* searchSaga(action) {
  const { props } = action;
  const data = yield serachSer(props);
  yield put(searchSuccess(data));
}

function* changePageSaga(action) {
  const { props, pageValue } = action;
  const temp = assign({}, props, {
    formData: assign({}, props.formData, {
      page: pageValue,
    }),
  });
  const data = yield serachSer(temp);
  yield put(searchSuccess(data));
}

function* changePageSizeSaga(action) {
  const { props, size } = action;
  const temp = assign({}, props, {
    formData: assign({}, props.formData, {
      pageSize: size,
    }),
  });
  const data = yield serachSer(temp);
  yield put(searchSuccess(data));
}

export default function* () {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.changeCity, changeCitySaga);
  yield takeLatest(types.search, searchSaga);
  yield takeLatest(types.changePage, changePageSaga);
  yield takeLatest(types.changePageSize, changePageSizeSaga);
}
