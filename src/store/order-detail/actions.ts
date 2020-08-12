import { action } from 'typesafe-actions';
import { OrderDetailActions, OrderDetail } from './types';

export const getOrderDetail = (uuid: any) =>
  action(OrderDetailActions.GET_ORDER_DETAIL, uuid);
export const setOrderDetail = (dataOrderDetail: OrderDetail) =>
  action(OrderDetailActions.SET_ORDER_DETAIL, dataOrderDetail);

export const fetchError = (message: string) =>
  action(OrderDetailActions.FETCH_ERROR, message);
export const fetchFilterData = (dataFilter: any) =>
  action(OrderDetailActions.FETCH_FILTER_DATA, dataFilter);
