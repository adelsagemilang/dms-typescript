import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { OrderDetailActions } from './types';
import { fetchError, setOrderDetail } from './actions';
import { callApi } from 'utils/services';

function* handleFetchOrderDetail(action: any) {
  const path = `/progress-monitoring/${action.payload.uuid}?`;

  const args = {
    method: 'GET',
    path: path,
  };

  try {
    const res = yield call(callApi, args);
    yield put(setOrderDetail(res));
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function* watchFetch() {
  yield takeEvery(OrderDetailActions.GET_ORDER_DETAIL, handleFetchOrderDetail);
}

function* OrderDetailSaga() {
  yield all([fork(watchFetch)]);
}

export default OrderDetailSaga;
