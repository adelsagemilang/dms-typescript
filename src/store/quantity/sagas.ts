import { all, call, put, fork, takeEvery, select } from 'redux-saga/effects';
import { callApi } from 'utils/services';
import { slugToTitle } from 'utils/helpers';
import { QuantityActions } from './types';
import * as Actions from './actions';

function* getData(type) {
  const getFilter = state => state.settingFilterValues.globalFilter;
  const params = yield select(getFilter);
  const args = {
    method: 'GET',
    path: `/quantity/${type}`,
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
  yield takeEvery(
    QuantityActions.ORDER_DELIVERY_REQUEST,
    getData,
    'order-delivery',
  );
  yield takeEvery(
    QuantityActions.ACTIVE_TRANSPORTER_REQUEST,
    getData,
    'active-transporter',
  );
  yield takeEvery(
    QuantityActions.AVERAGE_VOLUME_REQUEST,
    getData,
    'average-volume',
  );
  yield takeEvery(
    QuantityActions.AVERAGE_ORDER_TRANSPORTER_REQUEST,
    getData,
    'average-order-per-transporter',
  );
  yield takeEvery(QuantityActions.DAYS_TRIP_REQUEST, getData, 'days-per-trip');
  yield takeEvery(
    QuantityActions.ACTIVE_TRUCK_REQUEST,
    getData,
    'active-truck',
  );
  yield takeEvery(
    QuantityActions.AVERAGE_WEIGHT_REQUEST,
    getData,
    'average-weight',
  );
  yield takeEvery(
    QuantityActions.AVERAGE_ORDER_TRUCK_REQUEST,
    getData,
    'average-order-per-truck',
  );
  yield takeEvery(
    QuantityActions.TRIP_MONTH_REQUEST,
    getData,
    'trip-per-month',
  );
  yield takeEvery(QuantityActions.KM_TRIP_REQUEST, getData, 'km-per-trip');
}

function* QuantitySaga() {
  yield all([fork(watchFetchRequest)]);
}

export default QuantitySaga;
