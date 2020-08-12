import { action } from 'typesafe-actions';
import { KPIActionTypes, totalList, KPIAssignment, KPIPickup } from './types';

export const getDataKPITotal = () => action(KPIActionTypes.GET_DATA_TOTAL);
export const setDataKPITotal = (dataKPITotal: totalList) =>
  action(KPIActionTypes.SET_DATA_TOTAL, dataKPITotal);

export const getDataKPIAssignment = () =>
  action(KPIActionTypes.GET_DATA_ASSIGNMENT);
export const setDataKPIAssignment = (dataKPIAssignment: KPIAssignment) =>
  action(KPIActionTypes.SET_DATA_ASSIGNMENT, dataKPIAssignment);

export const getDataKPIPickup = () => action(KPIActionTypes.GET_DATA_PICKUP);
export const setDataKPIPickup = (dataKPIPickup: KPIPickup) =>
  action(KPIActionTypes.SET_DATA_PICKUP, dataKPIPickup);

export const getDataKPIDelivery = () =>
  action(KPIActionTypes.GET_DATA_DELIVERY);
export const setDataKPIDelivery = (dataKPIDelivery: KPIPickup) =>
  action(KPIActionTypes.SET_DATA_DELIVERY, dataKPIDelivery);

export const getDataKPIDropoff = () => action(KPIActionTypes.GET_DATA_DROPOFF);
export const setDataKPIDropoff = (dataKPIDropoff: KPIPickup) =>
  action(KPIActionTypes.SET_DATA_DROPOFF, dataKPIDropoff);

export const fetchError = (message: string) =>
  action(KPIActionTypes.FETCH_ERROR, message);
export const fetchFilterData = (dataFilter: any) =>
  action(KPIActionTypes.FETCH_FILTER_DATA, dataFilter);
