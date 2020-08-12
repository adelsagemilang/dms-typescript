import { Reducer } from 'redux';
import { LoginState, LoginActionTypes } from './types';

export const initialState: LoginState = {
  data: [],
  errors: undefined,
  loading: false,
  auth: undefined,
};
const LoginReducer: Reducer<LoginState> = (state = initialState, action) => {
  switch (action.type) {
    case LoginActionTypes.STORE_DATA: {
      return { ...state, loading: true, auth: action.payload };
    }
    case LoginActionTypes.SET_DATA: {
      return { ...state, loading: false, data: action.payload };
    }
    case LoginActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return { ...state, loading: false };
    }
  }
};

export default LoginReducer;
