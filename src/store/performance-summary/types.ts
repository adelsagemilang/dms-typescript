export type ApiResponse = Record<string, any>;

export interface OTIFGraph extends ApiResponse {
  otif: number;
  ot: number;
  if: number;
  xotif: number;
}

export interface PerformanceChart {
  title: string;
  data: PerformanceChartItem[];
}

interface PerformanceChartItem {
  name: string;
  data: number[];
}

export interface PerformanceChartNew {
  title: string;
  data: PerformanceChartItemNew[];
}

export interface PerformanceChartItemNew {
  name: string;
  data: PerformanceChartChildItem[];
}

export interface PerformanceChartTwo {
  title: string;
  data: PerformanceChartChildItemTwo[];
}

interface PerformanceChartChildItem {
  name: string;
  value: number;
}

interface PerformanceChartChildItemTwo {
  _id: string;
  year_month: string;
  value: number;
}

export interface PerformanceChartAssignment {
  title: string;
  data: PerformanceChartAssignmentItem[];
}

export interface PerformanceChartAssignmentItem {
  name: string;
  assign_transporter: number;
  assign_truck: number;
  dispatch: number;
}

export interface PerformanceChartDelivery {
  title: string;
  data: PerformanceChartDeliveryItem[];
}

export interface PerformanceChartDeliveryItem {
  name: string;
  delivery: number;
}

export interface PerformanceChartPickup {
  title: string;
  data: PerformanceChartPickupItem[];
}

export interface PerformanceChartPickupItem {
  name: string;
  inspection: number;
  waiting: number;
  loading: number;
  gateout: number;
}

export interface PerformanceChartDropoff {
  title: string;
  data: PerformanceChartDropoffItem[];
}

export interface PerformanceChartDropoffItem {
  name: string;
  inspection: number;
  waiting: number;
  unloading: number;
  checkout: number;
}

export interface GaugeItem {
  value: any;
  maxValue: any;
  allSegments: any[];
}

export interface KPIGraph extends ApiResponse {
  overall: number;
  assignment: number;
  execution_pickup: number;
  execution_delivery: number;
  execution_dropoff: number;
}

export interface PerformanceSummaryState {
  readonly loading: boolean;
  readonly dataOTIF?: OTIFGraph;
  readonly dataOTIFGraph?: OTIFGraph;
  readonly dataKPI?: KPIGraph;
  readonly dataKPIOverall?: PerformanceChartTwo;
  readonly dataKPIAssignment?: PerformanceChartAssignment;
  readonly dataKPIDelivery?: PerformanceChartDelivery;
  readonly dataKPIPickup?: PerformanceChartPickup;
  readonly dataKPIDropoff?: PerformanceChartDropoff;
  readonly errors?: string;
  readonly filterData?: any;
}

export enum PerformanceSummaryActionTypes {
  GET_DATA_OTIF = '@@PerformanceSummary/GET_DATA_OTIF',
  SET_DATA_OTIF = '@@PerformanceSummary/SET_DATA_OTIF',
  GET_DATA_OTIF_GRAPH = '@@PerformanceSummary/GET_DATA_OTIF_GRAPH',
  SET_DATA_OTIF_GRAPH = '@@PerformanceSummary/SET_DATA_OTIF_GRAPH',
  GET_DATA_KPI = '@@PerformanceSummary/GET_DATA_KPI',
  SET_DATA_KPI = '@@PerformanceSummary/SET_DATA_KPI',
  GET_DATA_KPI_OVERALL = '@@PerformanceSummary/GET_DATA_KPI_OVERALL',
  SET_DATA_KPI_OVERALL = '@@PerformanceSummary/SET_DATA_KPI_OVERALL',
  GET_DATA_KPI_ASSIGNMENT = '@@PerformanceSummary/GET_DATA_KPI_ASSIGNMENT',
  SET_DATA_KPI_ASSIGNMENT = '@@PerformanceSummary/SET_DATA_KPI_ASSIGNMENT',
  GET_DATA_KPI_DELIVERY = '@@PerformanceSummary/GET_DATA_KPI_DELIVERY',
  SET_DATA_KPI_DELIVERY = '@@PerformanceSummary/SET_DATA_KPI_DELIVERY',
  GET_DATA_KPI_PICKUP = '@@PerformanceSummary/GET_DATA_KPI_PICKUP',
  SET_DATA_KPI_PICKUP = '@@PerformanceSummary/SET_DATA_KPI_PICKUP',
  GET_DATA_KPI_DROPOFF = '@@PerformanceSummary/GET_DATA_KPI_DROPOFF',
  SET_DATA_KPI_DROPOFF = '@@PerformanceSummary/SET_DATA_KPI_DROPOFF',
  FETCH_ERROR = '@@PerformanceSummary/FETCH_ERROR',
  FETCH_FILTER_DATA = '@@PerformanceSummary/FETCH_FILTER_DATA',
}
