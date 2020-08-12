import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';
import * as FinancialTypes from './types';
import * as FinancialActions from './actions';

const { getTotalCost, getAveragePrice, getTotalOrder } = FinancialActions;

const totalCost = combineReducers({
  isLoading: createReducer(false as boolean)
    .handleAction([getTotalCost.request], (state, action) => true)
    .handleAction(
      [getTotalCost.success, getTotalCost.failure],
      (state, action) => false,
    ),
  chartData: createReducer(
    FinancialTypes.ChartFinancials.chartData,
  ).handleAction(getTotalCost.success, (state, action) => action.payload),
});

const averagePrice = combineReducers({
  isLoading: createReducer(false as boolean)
    .handleAction([getAveragePrice.request], (state, action) => true)
    .handleAction(
      [getAveragePrice.success, getAveragePrice.failure],
      (state, action) => false,
    ),
  chartData: createReducer(
    FinancialTypes.ChartFinancials.chartData,
  ).handleAction(getAveragePrice.success, (state, action) => action.payload),
});

const totalOrder = combineReducers({
  isLoading: createReducer(false as boolean)
    .handleAction([getTotalOrder.request], (state, action) => true)
    .handleAction(
      [getTotalOrder.success, getTotalOrder.failure],
      (state, action) => false,
    ),
  data: createReducer(FinancialTypes.TotalOrder).handleAction(
    getTotalOrder.success,
    (state, action) => action.payload,
  ),
});

const FinancialReducers = combineReducers({
  totalCost,
  averagePrice,
  totalOrder,
});

export default FinancialReducers;
export type FinancialState = ReturnType<typeof FinancialReducers>;
