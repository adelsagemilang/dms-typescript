import { createAsyncAction } from 'typesafe-actions';
import * as QuantityTypes from './types';

export const getOrderDelivery = createAsyncAction(
  QuantityTypes.QuantityActions.ORDER_DELIVERY_REQUEST,
  QuantityTypes.QuantityActions.ORDER_DELIVERY_SUCCESS,
  QuantityTypes.QuantityActions.ORDER_DELIVERY_FAILURE,
)<undefined, typeof QuantityTypes.Quantity[], string>();

export const getActiveTransporter = createAsyncAction(
  QuantityTypes.QuantityActions.ACTIVE_TRANSPORTER_REQUEST,
  QuantityTypes.QuantityActions.ACTIVE_TRANSPORTER_SUCCESS,
  QuantityTypes.QuantityActions.ACTIVE_TRANSPORTER_FAILURE,
)<undefined, typeof QuantityTypes.Quantity[], string>();

export const getAverageVolume = createAsyncAction(
  QuantityTypes.QuantityActions.AVERAGE_VOLUME_REQUEST,
  QuantityTypes.QuantityActions.AVERAGE_VOLUME_SUCCESS,
  QuantityTypes.QuantityActions.AVERAGE_VOLUME_FAILURE,
)<undefined, typeof QuantityTypes.Quantity[], string>();

export const getDaysPerTrip = createAsyncAction(
  QuantityTypes.QuantityActions.DAYS_TRIP_REQUEST,
  QuantityTypes.QuantityActions.DAYS_TRIP_SUCCESS,
  QuantityTypes.QuantityActions.DAYS_TRIP_FAILURE,
)<undefined, typeof QuantityTypes.Quantity[], string>();

export const getActiveTruck = createAsyncAction(
  QuantityTypes.QuantityActions.ACTIVE_TRUCK_REQUEST,
  QuantityTypes.QuantityActions.ACTIVE_TRUCK_SUCCESS,
  QuantityTypes.QuantityActions.ACTIVE_TRUCK_FAILURE,
)<undefined, typeof QuantityTypes.Quantity[], string>();

export const getAverageWeight = createAsyncAction(
  QuantityTypes.QuantityActions.AVERAGE_WEIGHT_REQUEST,
  QuantityTypes.QuantityActions.AVERAGE_WEIGHT_SUCCESS,
  QuantityTypes.QuantityActions.AVERAGE_WEIGHT_FAILURE,
)<undefined, typeof QuantityTypes.Quantity[], string>();

export const getAverageOrderPerTransporter = createAsyncAction(
  QuantityTypes.QuantityActions.AVERAGE_ORDER_TRANSPORTER_REQUEST,
  QuantityTypes.QuantityActions.AVERAGE_ORDER_TRANSPORTER_SUCCESS,
  QuantityTypes.QuantityActions.AVERAGE_ORDER_TRANSPORTER_FAILURE,
)<undefined, typeof QuantityTypes.Quantity[], string>();

export const getAverageOrderPerTruck = createAsyncAction(
  QuantityTypes.QuantityActions.AVERAGE_ORDER_TRUCK_REQUEST,
  QuantityTypes.QuantityActions.AVERAGE_ORDER_TRUCK_SUCCESS,
  QuantityTypes.QuantityActions.AVERAGE_ORDER_TRUCK_FAILURE,
)<undefined, typeof QuantityTypes.Quantity[], string>();

export const getTripPerMonth = createAsyncAction(
  QuantityTypes.QuantityActions.TRIP_MONTH_REQUEST,
  QuantityTypes.QuantityActions.TRIP_MONTH_SUCCESS,
  QuantityTypes.QuantityActions.TRIP_MONTH_FAILURE,
)<undefined, typeof QuantityTypes.Quantity[], string>();

export const getKmPerTrip = createAsyncAction(
  QuantityTypes.QuantityActions.KM_TRIP_REQUEST,
  QuantityTypes.QuantityActions.KM_TRIP_SUCCESS,
  QuantityTypes.QuantityActions.KM_TRIP_FAILURE,
)<undefined, typeof QuantityTypes.Quantity[], string>();
