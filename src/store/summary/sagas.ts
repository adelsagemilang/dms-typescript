import { all, call, put, fork, takeEvery, select } from 'redux-saga/effects';
import { callApi } from 'utils/services';
import { QuantityActions, FinancialActions } from './types';
import { getQuantityAsync, getFinancialAsync } from './actions';

function* getData(type) {
  const getFilter = state => state.settingFilterValues.globalFilter;
  const params = yield select(getFilter);
  const args = {
    method: 'GET',
    path: `/${type}`,
    params,
  };

  try {
    const res = yield call(callApi, args);
    if (type === 'quantity') {
      yield put(getQuantityAsync.success(res));
    } else {
      yield put(getFinancialAsync.success(res));
    }
  } catch (err) {
    console.log(err);
  }
}

function* watchFetchRequest() {
  yield takeEvery(QuantityActions.GET_DATA_REQUEST, getData, 'quantity');
  yield takeEvery(FinancialActions.GET_DATA_REQUEST, getData, 'financial');
}

function* SummarySaga() {
  yield all([fork(watchFetchRequest)]);
}

export default SummarySaga;
