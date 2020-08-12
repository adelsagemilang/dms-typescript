import { action } from 'typesafe-actions';
import { SettingFilterActionTypes, ListItem } from './types';

export const getDataLocation = () =>
  action(SettingFilterActionTypes.GET_DATA_LOCATION);
export const setDataLocation = (data: ListItem[]) =>
  action(SettingFilterActionTypes.SET_DATA_LOCATION, data);

export const getDataTransporter = () =>
  action(SettingFilterActionTypes.GET_DATA_TRANSPORTER);
export const setDataTransporter = (data: ListItem[]) =>
  action(SettingFilterActionTypes.SET_DATA_TRANSPORTER, data);

export const getDataInit = () =>
  action(SettingFilterActionTypes.GET_DATA_INITIAL);
export const setDataInit = (data: any) =>
  action(SettingFilterActionTypes.SET_DATA_INITIAL, data);

export const fetchError = (message: string) =>
  action(SettingFilterActionTypes.FETCH_ERROR, message);
export const fetchFilterData = (dataFilter: any) =>
  action(SettingFilterActionTypes.FETCH_FILTER_DATA, dataFilter);
