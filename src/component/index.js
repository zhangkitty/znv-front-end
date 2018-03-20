import assign from 'object-assign';
import { fork, call, take, all } from 'redux-saga/effects';
import { routerReducer } from 'react-router-redux';

const UPDATE_SAGA = '@@INNER/UPDATE_SAGA';

export default assign({
  routing: routerReducer,
}, __ROOT_REDUCER__);
const runningSaga = [];

function* waitingAwakeSaga(s) {
  let currentSaga = s;
  while (!currentSaga) {
    const action = yield take(UPDATE_SAGA);
    if (runningSaga.indexOf(action.saga) === -1) {
      runningSaga.push(action.saga);
      currentSaga = action.saga;
      break;
    }
  }
  for (let i = 0; i < 100; i++) {
    try {
      yield call(currentSaga);
    } catch (e) {
      /* eslint-disable no-console */
      console.error(e);
      /* eslint-enable  no-console */
    }
  }
}

export function* rootSaga() {
  const sagas = __ROOT_SAGA__.map(saga => fork(waitingAwakeSaga, saga));
  yield all(sagas);
}
