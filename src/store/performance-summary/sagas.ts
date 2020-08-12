import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { callApi } from 'utils/services';
import { queryStringBuilderNoaction, fetchFilter } from 'utils/helper';
import { getSetting } from 'utils/settingFilterCrypto';
import { PerformanceSummaryActionTypes } from './types';
import {
  fetchError,
  setDataOTIF,
  setDataOTIFGraph,
  setDataKPI,
  setDataKPIOverall,
  setDataKPIAssignment,
  setDataKPIDelivery,
  setDataKPIPickup,
  setDataKPIDropoff,
} from './actions';

function* handleFetchOTIF() {
  const localStorageFilter = getSetting();
  const filters = fetchFilter(localStorageFilter);
  const path = queryStringBuilderNoaction(`/performance/otif?`, filters);

  const args = {
    method: 'GET',
    path,
  };

  try {
    const res = yield call(callApi, args);
    yield put(setDataOTIF(res));
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function* handleFetchOTIFGraph() {
  const localStorageFilter = getSetting();
  const filters = fetchFilter(localStorageFilter);
  const path = queryStringBuilderNoaction(`/performance/otif/chart?`, filters);

  const args = {
    method: 'GET',
    path,
  };

  try {
    const res = yield call(callApi, args);
    yield put(setDataOTIFGraph(res));
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function* handleFetchKPI() {
  const localStorageFilter = getSetting();
  const filters = fetchFilter(localStorageFilter);
  const path = queryStringBuilderNoaction(`/performance/kpi?`, filters);

  const args = {
    method: 'GET',
    path,
  };

  try {
    const res = yield call(callApi, args);
    yield put(setDataKPI(res));
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function* handleFetchKPIOverall() {
  const localStorageFilter = getSetting();
  const filters = fetchFilter(localStorageFilter);
  const path = queryStringBuilderNoaction(
    `/performance/kpi/overall/chart?`,
    filters,
  );

  const args = {
    method: 'GET',
    path,
  };

  try {
    const res = yield call(callApi, args);
    yield put(setDataKPIOverall(res));
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function* handleFetchKPIAssignment() {
  const localStorageFilter = getSetting();
  const filters = fetchFilter(localStorageFilter);
  const path = queryStringBuilderNoaction(
    `/performance/kpi/assignment/chart?`,
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

function* handleFetchKPIDelivery() {
  const localStorageFilter = getSetting();
  const filters = fetchFilter(localStorageFilter);
  const path = queryStringBuilderNoaction(
    `/performance/kpi/execution_delivery/chart?`,
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

function* handleFetchKPIPickup() {
  const localStorageFilter = getSetting();
  const filters = fetchFilter(localStorageFilter);
  const path = queryStringBuilderNoaction(
    `/performance/kpi/execution_pickup/chart?`,
    filters,
  );

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

function* handleFetchKPIDropoff() {
  const localStorageFilter = getSetting();
  const filters = fetchFilter(localStorageFilter);
  const path = queryStringBuilderNoaction(
    `/performance/kpi/execution_dropoff/chart?`,
    filters,
  );

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
  yield takeEvery(PerformanceSummaryActionTypes.GET_DATA_OTIF, handleFetchOTIF);
  yield takeEvery(
    PerformanceSummaryActionTypes.GET_DATA_OTIF_GRAPH,
    handleFetchOTIFGraph,
  );
  yield takeEvery(PerformanceSummaryActionTypes.GET_DATA_KPI, handleFetchKPI);
  yield takeEvery(
    PerformanceSummaryActionTypes.GET_DATA_KPI_OVERALL,
    handleFetchKPIOverall,
  );
  yield takeEvery(
    PerformanceSummaryActionTypes.GET_DATA_KPI_ASSIGNMENT,
    handleFetchKPIAssignment,
  );
  yield takeEvery(
    PerformanceSummaryActionTypes.GET_DATA_KPI_DELIVERY,
    handleFetchKPIDelivery,
  );
  yield takeEvery(
    PerformanceSummaryActionTypes.GET_DATA_KPI_PICKUP,
    handleFetchKPIPickup,
  );
  yield takeEvery(
    PerformanceSummaryActionTypes.GET_DATA_KPI_DROPOFF,
    handleFetchKPIDropoff,
  );
}

function* performanceSummarySaga() {
  yield all([fork(watchFetch)]);
}

export default performanceSummarySaga;
