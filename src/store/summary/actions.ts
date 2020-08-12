import { createAsyncAction } from 'typesafe-actions';
import * as SummaryTypes from './types';

export const getQuantityAsync = createAsyncAction(
  SummaryTypes.QuantityActions.GET_DATA_REQUEST,
  SummaryTypes.QuantityActions.GET_DATA_SUCCESS,
  SummaryTypes.QuantityActions.GET_DATA_FAILURE,
)<undefined, typeof SummaryTypes.Quantity[], string>();

export const getFinancialAsync = createAsyncAction(
  SummaryTypes.FinancialActions.GET_DATA_REQUEST,
  SummaryTypes.FinancialActions.GET_DATA_SUCCESS,
  SummaryTypes.FinancialActions.GET_DATA_FAILURE,
)<undefined, typeof SummaryTypes.Financial[], string>();
