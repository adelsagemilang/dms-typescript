import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { callApi } from 'utils/services';
import { SettingFilterActionTypes } from './types';
import {
  fetchError,
  setDataLocation,
  setDataTransporter,
  setDataInit,
} from './actions';
import { getSetting, setSetting as setCrypto } from 'utils/settingFilterCrypto';

function* handleFetchLocation() {
  const args = {
    method: 'GET',
    path: `/location`,
  };

  try {
    const res = yield call(callApi, args);
    yield put(setDataLocation(res));
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function* handleFetchTransporter() {
  const args = {
    method: 'GET',
    path: `/transporter`,
  };

  try {
    const res = yield call(callApi, args);
    yield put(setDataTransporter(res));
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function* handleFetchInitial() {
  const localStorageFilter = getSetting();
  let transporters = {};
  let locations = {};
  let globalFilterValue = {};

  const argsTransporter = {
    method: 'GET',
    path: `/transporter`,
  };
  const argsLocation = {
    method: 'GET',
    path: `/location`,
  };

  try {
    const res = yield call(callApi, argsTransporter);
    transporters =
      res &&
      res.map(itemLoc => {
        return itemLoc.id.toString();
      });
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }

  try {
    const res = yield call(callApi, argsLocation);
    locations =
      res &&
      res.map(itemLoc => {
        return itemLoc.id.toString();
      });
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }

  globalFilterValue = {
    year: localStorageFilter.year
      ? localStorageFilter.year
      : new Date().getFullYear(),
    month: localStorageFilter.month ? localStorageFilter.month : 'all',
    location: locations,
    transporter: transporters,
  };

  const encryptedSetting = setCrypto(globalFilterValue);
  localStorage.setItem('settingFilter', encryptedSetting);

  yield put(setDataInit(globalFilterValue));
}

function* watchFetch() {
  yield takeEvery(
    SettingFilterActionTypes.GET_DATA_LOCATION,
    handleFetchLocation,
  );
  yield takeEvery(
    SettingFilterActionTypes.GET_DATA_TRANSPORTER,
    handleFetchTransporter,
  );
  yield takeEvery(
    SettingFilterActionTypes.GET_DATA_INITIAL,
    handleFetchInitial,
  );
}

function* settingFilterSaga() {
  yield all([fork(watchFetch)]);
}

export default settingFilterSaga;
