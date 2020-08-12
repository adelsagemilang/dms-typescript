import { all, call, put, fork, takeEvery, select } from 'redux-saga/effects';
import { callApi } from 'utils/services';
import { slugToTitle } from 'utils/helpers';
import { FinancialActions } from './types';
import * as Actions from './actions';

function* getData(type) {
  const getFilter = state => state.settingFilterValues.globalFilter;
  const params = yield select(getFilter);
  const args = {
    method: 'GET',
    path: `/financial${type !== 'total-order' ? `/${type}` : ''}`,
    params,
  };

  try {
    const res = yield call(callApi, args);
    const title = `get${slugToTitle(type)}`;
    yield put(Actions[title].success(res));
  } catch (err) {
    console.log(err);
  }
}

function* watchFetchRequest() {
  yield takeEvery(FinancialActions.TOTAL_COST_REQUEST, getData, 'total-cost');
  yield takeEvery(
    FinancialActions.AVERAGE_PRICE_REQUEST,
    getData,
    'average-price',
  );
  yield takeEvery(FinancialActions.TOTAL_ORDER_REQUEST, getData, 'total-order');
}

function* FinancialSaga() {
  yield all([fork(watchFetchRequest)]);
}

export default FinancialSaga;
