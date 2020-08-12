import { createAsyncAction } from 'typesafe-actions';
import * as KpiProgressTypes from './types';

export const getKpiProgress = createAsyncAction(
  [
    KpiProgressTypes.KpiProgressActions.KPI_PROGRESS_REQUEST,
    (page: number) => page,
  ],
  [
    KpiProgressTypes.KpiProgressActions.KPI_PROGRESS_SUCCESS,
    (res: typeof KpiProgressTypes.KpiProgress[]) => res,
  ],
  [
    KpiProgressTypes.KpiProgressActions.KPI_PROGRESS_FAILURE,
    (err: string) => err,
  ],
)();
