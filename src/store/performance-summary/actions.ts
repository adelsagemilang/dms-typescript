import { action } from 'typesafe-actions';
import {
  PerformanceSummaryActionTypes,
  OTIFGraph,
  KPIGraph,
  PerformanceChartNew,
  PerformanceChartAssignment,
  PerformanceChartDelivery,
  PerformanceChartPickup,
  PerformanceChartDropoff,
} from './types';

export const getDataOTIF = () =>
  action(PerformanceSummaryActionTypes.GET_DATA_OTIF);
export const setDataOTIF = (dataOTIF: OTIFGraph) =>
  action(PerformanceSummaryActionTypes.SET_DATA_OTIF, dataOTIF);

export const getDataOTIFGraph = () =>
  action(PerformanceSummaryActionTypes.GET_DATA_OTIF_GRAPH);
export const setDataOTIFGraph = (dataOTIFGraph: OTIFGraph) =>
  action(PerformanceSummaryActionTypes.SET_DATA_OTIF_GRAPH, dataOTIFGraph);

export const getDataKPI = () =>
  action(PerformanceSummaryActionTypes.GET_DATA_KPI);
export const setDataKPI = (dataKPI: KPIGraph) =>
  action(PerformanceSummaryActionTypes.SET_DATA_KPI, dataKPI);

export const getDataKPIOverall = () =>
  action(PerformanceSummaryActionTypes.GET_DATA_KPI_OVERALL);
export const setDataKPIOverall = (dataKPIOverall: PerformanceChartNew) =>
  action(PerformanceSummaryActionTypes.SET_DATA_KPI_OVERALL, dataKPIOverall);

export const getDataKPIAssignment = () =>
  action(PerformanceSummaryActionTypes.GET_DATA_KPI_ASSIGNMENT);
export const setDataKPIAssignment = (
  dataKPIAssignment: PerformanceChartAssignment,
) =>
  action(
    PerformanceSummaryActionTypes.SET_DATA_KPI_ASSIGNMENT,
    dataKPIAssignment,
  );

export const getDataKPIDelivery = () =>
  action(PerformanceSummaryActionTypes.GET_DATA_KPI_DELIVERY);
export const setDataKPIDelivery = (dataKPIDelivery: PerformanceChartDelivery) =>
  action(PerformanceSummaryActionTypes.SET_DATA_KPI_DELIVERY, dataKPIDelivery);

export const getDataKPIPickup = () =>
  action(PerformanceSummaryActionTypes.GET_DATA_KPI_PICKUP);
export const setDataKPIPickup = (dataKPIPickup: PerformanceChartPickup) =>
  action(PerformanceSummaryActionTypes.SET_DATA_KPI_PICKUP, dataKPIPickup);

export const getDataKPIDropoff = () =>
  action(PerformanceSummaryActionTypes.GET_DATA_KPI_DROPOFF);
export const setDataKPIDropoff = (dataKPIDropoff: PerformanceChartDropoff) =>
  action(PerformanceSummaryActionTypes.SET_DATA_KPI_DROPOFF, dataKPIDropoff);

export const fetchError = (message: string) =>
  action(PerformanceSummaryActionTypes.FETCH_ERROR, message);
export const fetchFilterData = (dataFilter: any) =>
  action(PerformanceSummaryActionTypes.FETCH_FILTER_DATA, dataFilter);
