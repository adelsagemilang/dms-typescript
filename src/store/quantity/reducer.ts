import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';
import * as QuantityTypes from './types';
import * as QuantityActions from './actions';

const {
  getOrderDelivery,
  getActiveTransporter,
  getAverageVolume,
  getDaysPerTrip,
  getActiveTruck,
  getAverageWeight,
  getAverageOrderPerTransporter,
  getAverageOrderPerTruck,
  getTripPerMonth,
  getKmPerTrip,
} = QuantityActions;

const orderDeliveries = combineReducers({
  isLoading: createReducer(false as boolean)
    .handleAction([getOrderDelivery.request], (state, action) => true)
    .handleAction(
      [getOrderDelivery.success, getOrderDelivery.failure],
      (state, action) => false,
    ),
  chartData: createReducer(QuantityTypes.Quantity.chartData).handleAction(
    getOrderDelivery.success,
    (state, action) => action.payload,
  ),
});

const activeTransporters = combineReducers({
  isLoading: createReducer(false as boolean)
    .handleAction([getActiveTransporter.request], (state, action) => true)
    .handleAction(
      [getActiveTransporter.success, getActiveTransporter.failure],
      (state, action) => false,
    ),
  chartData: createReducer(QuantityTypes.Quantity.chartData).handleAction(
    getActiveTransporter.success,
    (state, action) => action.payload,
  ),
});

const averageVolumes = combineReducers({
  isLoading: createReducer(false as boolean)
    .handleAction([getAverageVolume.request], (state, action) => true)
    .handleAction(
      [getAverageVolume.success, getAverageVolume.failure],
      (state, action) => false,
    ),
  chartData: createReducer(QuantityTypes.Quantity.chartData).handleAction(
    getAverageVolume.success,
    (state, action) => action.payload,
  ),
});

const daysTrips = combineReducers({
  isLoading: createReducer(false as boolean)
    .handleAction([getDaysPerTrip.request], (state, action) => true)
    .handleAction(
      [getDaysPerTrip.success, getDaysPerTrip.failure],
      (state, action) => false,
    ),
  chartData: createReducer(QuantityTypes.Quantity.chartData).handleAction(
    getDaysPerTrip.success,
    (state, action) => action.payload,
  ),
});

const activeTrucks = combineReducers({
  isLoading: createReducer(false as boolean)
    .handleAction([getActiveTruck.request], (state, action) => true)
    .handleAction(
      [getActiveTruck.success, getActiveTruck.failure],
      (state, action) => false,
    ),
  chartData: createReducer(QuantityTypes.Quantity.chartData).handleAction(
    getActiveTruck.success,
    (state, action) => action.payload,
  ),
});

const averageWeights = combineReducers({
  isLoading: createReducer(false as boolean)
    .handleAction([getAverageWeight.request], (state, action) => true)
    .handleAction(
      [getAverageWeight.success, getAverageWeight.failure],
      (state, action) => false,
    ),
  chartData: createReducer(QuantityTypes.Quantity.chartData).handleAction(
    getAverageWeight.success,
    (state, action) => action.payload,
  ),
});

const averageOrderTransporters = combineReducers({
  isLoading: createReducer(false as boolean)
    .handleAction(
      [getAverageOrderPerTransporter.request],
      (state, action) => true,
    )
    .handleAction(
      [
        getAverageOrderPerTransporter.success,
        getAverageOrderPerTransporter.failure,
      ],
      (state, action) => false,
    ),
  chartData: createReducer(QuantityTypes.Quantity.chartData).handleAction(
    getAverageOrderPerTransporter.success,
    (state, action) => action.payload,
  ),
});

const averageOrderTrucks = combineReducers({
  isLoading: createReducer(false as boolean)
    .handleAction([getAverageOrderPerTruck.request], (state, action) => true)
    .handleAction(
      [getAverageOrderPerTruck.success, getAverageOrderPerTruck.failure],
      (state, action) => false,
    ),
  chartData: createReducer(QuantityTypes.Quantity.chartData).handleAction(
    getAverageOrderPerTruck.success,
    (state, action) => action.payload,
  ),
});

const tripMonths = combineReducers({
  isLoading: createReducer(false as boolean)
    .handleAction([getTripPerMonth.request], (state, action) => true)
    .handleAction(
      [getTripPerMonth.success, getTripPerMonth.failure],
      (state, action) => false,
    ),
  chartData: createReducer(QuantityTypes.Quantity.chartData).handleAction(
    getTripPerMonth.success,
    (state, action) => action.payload,
  ),
});

const kmTrips = combineReducers({
  isLoading: createReducer(false as boolean)
    .handleAction([getKmPerTrip.request], (state, action) => true)
    .handleAction(
      [getKmPerTrip.success, getKmPerTrip.failure],
      (state, action) => false,
    ),
  chartData: createReducer(QuantityTypes.Quantity.chartData).handleAction(
    getKmPerTrip.success,
    (state, action) => action.payload,
  ),
});

const QuantityReducer = combineReducers({
  orderDeliveries,
  activeTransporters,
  averageVolumes,
  daysTrips,
  activeTrucks,
  averageWeights,
  averageOrderTransporters,
  averageOrderTrucks,
  tripMonths,
  kmTrips,
});

export default QuantityReducer;
export type QuantityState = ReturnType<typeof QuantityReducer>;
