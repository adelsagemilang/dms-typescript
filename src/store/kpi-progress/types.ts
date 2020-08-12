export const KpiProgress = {
  isLoading: false,
  data: {
    data: [],
    total_page: 0,
  },
};

export enum KpiProgressActions {
  KPI_PROGRESS_REQUEST = '@@QUANTITY/GET_KPI_PROGRESS_REQUEST',
  KPI_PROGRESS_SUCCESS = '@@QUANTITY/GET_KPI_PROGRESS_SUCCESS',
  KPI_PROGRESS_FAILURE = '@@QUANTITY/GET_KPI_PROGRESS_FAILURE',
}
