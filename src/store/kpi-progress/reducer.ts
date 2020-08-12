import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';
import * as KpiProgressTypes from './types';
import * as KpiProgressActions from './actions';

const { getKpiProgress } = KpiProgressActions;

export const isLoading = createReducer(false as boolean)
  .handleAction([getKpiProgress.request], (state, action) => true)
  .handleAction(
    [getKpiProgress.success, getKpiProgress.failure],
    (state, action) => false,
  );

export const data = createReducer(KpiProgressTypes.KpiProgress).handleAction(
  getKpiProgress.success,
  (state, action) => action.payload,
);

const KpiProgressReducer = combineReducers({
  isLoading,
  data,
});

export default KpiProgressReducer;
export type KpiProgressState = ReturnType<typeof KpiProgressReducer>;
