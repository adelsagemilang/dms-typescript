import { action } from 'typesafe-actions';
import { LoginActionTypes, LoginAuth } from './types';

export const storeData = (auth: LoginAuth) =>
  action(LoginActionTypes.STORE_DATA, auth);
export const setData = (data: []) => action(LoginActionTypes.SET_DATA, data);
export const fetchError = (message: string) =>
  action(LoginActionTypes.FETCH_ERROR, message);
