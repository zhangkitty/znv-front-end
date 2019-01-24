import { message } from 'antd';
import { take, put, fork, takeLatest } from 'redux-saga/effects';
import { initSuccess } from './action';
import * as types from './types';
import { initSer } from './server';

function* init() {
  while (true) {
    const action = yield take(types.init);
    const data = yield initSer(action.props);
    debugger;
    if (data.errCode === 0) {
      yield put(initSuccess(data));
    } else {
      message.error(data.msg);
    }
  }
}


function* mainSaga() {
  yield fork(init);
  // yield takeLatest(types.search, search);
  //   // yield takeLatest(types.handle, handle);
}

export default mainSaga;
