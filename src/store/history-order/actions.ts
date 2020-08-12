import { action } from 'typesafe-actions';
import {
  HistoryOrderState,
  HistoryOrderActionTypes,
  HistoryDetail,
} from './types';

export const fetchRequest = (params?: any) =>
  action(HistoryOrderActionTypes.FETCH_REQUEST, params);
export const fetchSuccess = (data: HistoryOrderState[]) =>
  action(HistoryOrderActionTypes.FETCH_SUCCESS, data);
export const fetchError = (message: string) =>
  action(HistoryOrderActionTypes.FETCH_ERROR, message);
export const fetchDoughnutData = (doughnutData: any) =>
  action(HistoryOrderActionTypes.FETCH_DOUGHNUT_DATA, doughnutData);
export const fetchDetail = (params: any) =>
  action(HistoryOrderActionTypes.FETCH_DETAIL, params);
// export const fetchDetail = (location_id: string) => action(HistoryOrderActionTypes.FETCH_DETAIL, location_id)
export const fetchDetailSuccess = (detail: HistoryDetail[]) =>
  action(HistoryOrderActionTypes.FETCH_DETAIL_SUCCESS, detail);
