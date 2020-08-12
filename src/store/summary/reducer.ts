import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';
import * as SummaryTypes from './types';
import * as SummaryActions from './actions';

const { getQuantityAsync, getFinancialAsync } = SummaryActions;

export const isLoadingQuantity = createReducer(false as boolean)
  .handleAction([getQuantityAsync.request], (state, action) => true)
  .handleAction(
    [getQuantityAsync.success, getQuantityAsync.failure],
    (state, action) => false,
  );

export const quantity = createReducer(SummaryTypes.Quantity).handleAction(
  getQuantityAsync.success,
  (state, action) => action.payload,
);

export const isLoadingFinancial = createReducer(false as boolean)
  .handleAction([getFinancialAsync.request], (state, action) => true)
  .handleAction(
    [getFinancialAsync.success, getFinancialAsync.failure],
    (state, action) => false,
  );

export const financial = createReducer(SummaryTypes.Financial).handleAction(
  getFinancialAsync.success,
  (state, action) => action.payload,
);

const SummaryReducer = combineReducers({
  isLoadingQuantity,
  quantity,
  isLoadingFinancial,
  financial,
});

export default SummaryReducer;
export type SummaryState = ReturnType<typeof SummaryReducer>;
