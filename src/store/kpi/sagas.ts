import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { callApi } from 'utils/services';
import { queryStringBuilderNoaction, fetchFilter } from 'utils/helper';
import { getSetting } from 'utils/settingFilterCrypto';
import { KPIActionTypes } from './types';
import {
  fetchError,
  setDataKPITotal,
  setDataKPIAssignment,
  setDataKPIPickup,
  setDataKPIDelivery,
  setDataKPIDropoff,
} from './actions';

function* handleFetchTotal() {
  const localStorageFilter = getSetting();
  const filters = fetchFilter(localStorageFilter);
  const path = queryStringBuilderNoaction(`/performance/kpi/total?`, filters);

  const args = {
    method: 'GET',
    path,
  };

  try {
    const res = yield call(callApi, args);
    yield put(setDataKPITotal(res));
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function* handleFetchAssignment() {
  const localStorageFilter = getSetting();
  const filters = fetchFilter(localStorageFilter);
  const path = queryStringBuilderNoaction(
    `/performance/kpi/assignment?`,
    filters,
  );

  const args = {
    method: 'GET',
    path,
  };

  try {
    const res = yield call(callApi, args);
    yield put(setDataKPIAssignment(res));
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function* handleFetchPickup() {
  const localStorageFilter = getSetting();
  const filters = fetchFilter(localStorageFilter);
  const path = queryStringBuilderNoaction(`/performance/kpi/pickup?`, filters);

  const args = {
    method: 'GET',
    path,
  };

  try {
    const res = yield call(callApi, args);
    yield put(setDataKPIPickup(res));
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function* handleFetchDelivery() {
  const localStorageFilter = getSetting();
  const filters = fetchFilter(localStorageFilter);
  const path = queryStringBuilderNoaction(
    `/performance/kpi/delivery?`,
    filters,
  );

  const args = {
    method: 'GET',
    path,
  };

  try {
    const res = yield call(callApi, args);
    yield put(setDataKPIDelivery(res));
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function* handleFetchDropoff() {
  const localStorageFilter = getSetting();
  const filters = fetchFilter(localStorageFilter);
  const path = queryStringBuilderNoaction(`/performance/kpi/dropoff?`, filters);

  const args = {
    method: 'GET',
    path,
  };

  try {
    const res = yield call(callApi, args);
    yield put(setDataKPIDropoff(res));
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function* watchFetch() {
  yield takeEvery(KPIActionTypes.GET_DATA_TOTAL, handleFetchTotal);
  yield takeEvery(KPIActionTypes.GET_DATA_ASSIGNMENT, handleFetchAssignment);
  yield takeEvery(KPIActionTypes.GET_DATA_PICKUP, handleFetchPickup);
  yield takeEvery(KPIActionTypes.GET_DATA_DELIVERY, handleFetchDelivery);
  yield takeEvery(KPIActionTypes.GET_DATA_DROPOFF, handleFetchDropoff);
}

function* KPISaga() {
  yield all([fork(watchFetch)]);
}

export default KPISaga;
