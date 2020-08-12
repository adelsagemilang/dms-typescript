import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { HistoryOrderActionTypes } from './types';
import {
  fetchError,
  fetchSuccess,
  fetchDetail,
  fetchDetailSuccess,
} from './actions';
import { getApi } from '../../utils/api-axios';
import { queryStringBuilder } from '../../utils/helper';

function* handleFetch(action: any) {
  try {
    const endpoint = queryStringBuilder('/history?', action);

    const res = yield call(getApi, endpoint, {});

    if (res.error) {
      yield put(fetchError(res.error));
    } else {
      yield put(fetchSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function* handleFetchDetail(action: ReturnType<typeof fetchDetail>) {
  try {
    const endpoint = queryStringBuilder(
      `/history/${action.payload.params.location_id}?`,
      action,
    );
    const res = yield call(getApi, endpoint, {});

    if (res.error) {
      yield put(fetchError(res.error));
    } else {
      yield put(fetchDetailSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function* watchFetchRequest() {
  yield takeEvery(HistoryOrderActionTypes.FETCH_REQUEST, handleFetch);
}

function* watchFetchDetailRequest() {
  yield takeEvery(HistoryOrderActionTypes.FETCH_DETAIL, handleFetchDetail);
}

function* historyOrderSaga() {
  yield all([fork(watchFetchRequest), fork(watchFetchDetailRequest)]);
}

export default historyOrderSaga;
