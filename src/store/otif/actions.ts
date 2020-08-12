import { action } from 'typesafe-actions';
import { OTIFActionTypes, OTIFList } from './types';

export const getDataList = (params?: any) =>
  action(OTIFActionTypes.GET_DATA_LIST, params);
export const setDataList = (dataOTIFList: OTIFList) =>
  action(OTIFActionTypes.SET_DATA_LIST, dataOTIFList);

export const fetchError = (message: string) =>
  action(OTIFActionTypes.FETCH_ERROR, message);
export const fetchFilterData = (dataFilter: any) =>
  action(OTIFActionTypes.FETCH_FILTER_DATA, dataFilter);
