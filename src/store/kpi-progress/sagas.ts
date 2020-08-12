import { all, call, put, fork, takeEvery, select } from 'redux-saga/effects';
import { callApi } from 'utils/services';
import { KpiProgressActions } from './types';
import { getKpiProgress } from './actions';

function* getData(action) {
  const page = action.payload || 1;
  const getFilter = state => state.settingFilterValues.globalFilter;
  const params = yield select(getFilter);
  const args = {
    method: 'GET',
    path: `/progress-monitoring`,
    params: {
      page,
      ...params,
    },
  };

  try {
    const res = yield call(callApi, args);
    yield put(getKpiProgress.success(res));
  } catch (err) {
    console.log(err);
  }
}

function* watchFetchRequest() {
  yield takeEvery(KpiProgressActions.KPI_PROGRESS_REQUEST, getData);
}

function* KpiProgressSaga() {
  yield all([fork(watchFetchRequest)]);
}

export default KpiProgressSaga;
