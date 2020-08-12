export type ApiResponse = Record<string, any>;

export interface KPIList {
  total: totalList;
  kpi_assignment: KPIAssignment;
  pickup: KPIPickup;
  delivery: KPIDelivery;
  drop_off: KPIDropoff;
}

export interface KPIExecution {
  pickup: KPIPickup;
  delivery: KPIDelivery;
  drop_off: KPIDropoff;
}

export interface KPIAssignment {
  transporter: itemList;
  truck: itemList;
  dispatch: itemList;
}

export interface KPIPickup {
  arrival: itemList;
  inspection: itemList;
  waiting: itemList;
  loading: itemList;
  gate_out: itemList;
}

export interface KPIDelivery {
  delivery: itemList;
}

export interface KPIDropoff {
  inspection: itemList;
  waiting: itemList;
  unloading: itemList;
  checkout: itemList;
}

export interface totalList {
  percentage: number;
  ok: number;
  alert: number;
  total: number;
}

interface itemList {
  percentage: number;
  ok: number;
  alert: number;
  total: number;
  average_time: string;
  average_kpi: number;
}

export interface KPIState {
  readonly loading: boolean;
  readonly dataKPITotal?: totalList;
  readonly dataKPIAssignment?: KPIAssignment;
  readonly dataKPIPickup?: KPIPickup;
  readonly dataKPIDelivery?: KPIDelivery;
  readonly dataKPIDropoff?: KPIDropoff;
  readonly errors?: string;
  readonly filterData?: any;
}

export enum KPIActionTypes {
  GET_DATA_TOTAL = '@@KPI/GET_DATA_TOTAL',
  SET_DATA_TOTAL = '@@KPI/SET_DATA_TOTAL',
  GET_DATA_ASSIGNMENT = '@@KPI/GET_DATA_ASSIGNMENT',
  SET_DATA_ASSIGNMENT = '@@KPI/SET_DATA_ASSIGNMENT',
  GET_DATA_PICKUP = '@@KPI/GET_DATA_PICKUP',
  SET_DATA_PICKUP = '@@KPI/SET_DATA_PICKUP',
  GET_DATA_DELIVERY = '@@KPI/GET_DATA_DELIVERY',
  SET_DATA_DELIVERY = '@@KPI/SET_DATA_DELIVERY',
  GET_DATA_DROPOFF = '@@KPI/GET_DATA_DROPOFF',
  SET_DATA_DROPOFF = '@@KPI/SET_DATA_DROPOFF',
  FETCH_ERROR = '@@KPI/FETCH_ERROR',
  FETCH_FILTER_DATA = '@@KPI/FETCH_FILTER_DATA',
}
