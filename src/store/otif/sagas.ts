import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { callApi } from 'utils/services';
import { queryStringBuilder, pushAction } from 'utils/helper';
import { getSetting } from 'utils/settingFilterCrypto';
import { fetchError, setDataList } from './actions';
import { OTIFActionTypes } from './types';

function* handleFetchOTIF(action: any) {
  const localStorageFilter = getSetting();
  const newAction = pushAction(action, localStorageFilter);
  const path = queryStringBuilder(`/performance/otif/list?`, newAction);

  const args = {
    method: 'GET',
    path,
  };

  try {
    const res = yield call(callApi, args);
    yield put(setDataList(res));
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function* watchFetch() {
  yield takeEvery(OTIFActionTypes.GET_DATA_LIST, handleFetchOTIF);
}

function* OTIFSaga() {
  yield all([fork(watchFetch)]);
}

export default OTIFSaga;
