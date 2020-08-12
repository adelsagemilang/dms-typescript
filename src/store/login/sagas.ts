import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { callApi } from 'utils/services';
import { setSession } from 'utils/auth';
import { push } from 'connected-react-router';
import { setAdminLayout } from 'layout/actions';
import { LoginActionTypes } from './types';
import { fetchError, storeData } from './actions';

function* handleFetch(action: ReturnType<typeof storeData>) {
  const args = {
    method: 'POST',
    path: '/api/weblogin',
    data: action.payload,
    url: process.env.REACT_APP_API_MAIN_ENDPOINT,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      secretkey: '4df4afd62a9d60b5681e61c8db1dba5b',
      appid: '105',
    },
  };

  try {
    const res = yield call(callApi, args);

    if (res.error) {
      yield put(fetchError('Email atau password yang Anda masukan, salah!'));
    } else {
      setSession(res.data);
      yield put(setAdminLayout(true));
      yield put(push('/'));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError('Email atau password yang Anda masukan, salah!'));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function* watchFetch() {
  yield takeLatest(LoginActionTypes.STORE_DATA, handleFetch);
}

function* LoginSaga() {
  yield all([fork(watchFetch)]);
}

export default LoginSaga;
