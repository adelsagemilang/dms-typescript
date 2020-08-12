import { createAsyncAction } from 'typesafe-actions';
import * as FinancialTypes from './types';

export const getTotalCost = createAsyncAction(
  FinancialTypes.FinancialActions.TOTAL_COST_REQUEST,
  FinancialTypes.FinancialActions.TOTAL_COST_SUCCESS,
  FinancialTypes.FinancialActions.TOTAL_COST_FAILURE,
)<undefined, typeof FinancialTypes.ChartFinancials[], string>();

export const getAveragePrice = createAsyncAction(
  FinancialTypes.FinancialActions.AVERAGE_PRICE_REQUEST,
  FinancialTypes.FinancialActions.AVERAGE_PRICE_SUCCESS,
  FinancialTypes.FinancialActions.AVERAGE_PRICE_FAILURE,
)<undefined, typeof FinancialTypes.ChartFinancials[], string>();

export const getTotalOrder = createAsyncAction(
  FinancialTypes.FinancialActions.TOTAL_ORDER_REQUEST,
  FinancialTypes.FinancialActions.TOTAL_ORDER_SUCCESS,
  FinancialTypes.FinancialActions.TOTAL_ORDER_FAILURE,
)<undefined, typeof FinancialTypes.TotalOrder[], string>();
