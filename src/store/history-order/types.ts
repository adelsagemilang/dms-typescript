export type ApiResponse = Record<string, any>;
export interface HistoryOrder extends ApiResponse {
  id: string;
  total: number;
  destination: string;
  location: StatusState;
  transporter: StatusState;
  sub_total: StatusState;
  truck: StatusState;
  dispatch: StatusState;
  arrival: StatusState;
  inspection: StatusState;
  waiting_loading: StatusState;
  loading: StatusState;
  gate_out: StatusState;
  delivery: StatusState;
  drop_off_inspection: StatusState;
  waiting_unloading: StatusState;
  unloading: StatusState;
  checkout: StatusState;
}

export interface StatusState {
  on_time: number;
  alert: number;
}

export interface HistoryDetail extends ApiResponse {
  job_number: string;
  pickup_location_name: any;
  pickup_location_id: any;
  pickup_location_address: any;
  pickup_region_name: any;
  deliver_location_name: any;
  deliver_location_id: any;
  deliver_location_address: any;
  deliver_region_name: any;
  last_estimate: any;
  order_sate: HistoryDetailStateName;
}

export interface HistoryDetailStateName {
  transporter: HistoryDetailStatus;
  truck: HistoryDetailStatus;
  dispatch: HistoryDetailStatus;
  pickup_arrival: HistoryDetailStatus;
  inspection: HistoryDetailStatus;
  waiting_loading: HistoryDetailStatus;
  loading: HistoryDetailStatus;
  gate_out: HistoryDetailStatus;
  arrive_destination: HistoryDetailStatus;
  inspection_destination: HistoryDetailStatus;
  waiting_unloading: HistoryDetailStatus;
  unloading: HistoryDetailStatus;
  checkout: HistoryDetailStatus;
}

export interface HistoryDetailStatus {
  kpi: number;
  diff: number;
  estimate: any;
  prev: any;
  actual: any;
  actual_prev: any;
}

export enum HistoryOrderActionTypes {
  FETCH_REQUEST = '@@HistoryOrder/FETCH_REQUEST',
  FETCH_SUCCESS = '@@HistoryOrder/FETCH_SUCCESS',
  FETCH_ERROR = '@@HistoryOrder/FETCH_ERROR',
  FETCH_DOUGHNUT_DATA = '@@HistoryOrder/FETCH_DOUGHNUT_DATA',
  FETCH_DETAIL = '@@HistoryOrder/FETCH_DETAIL',
  FETCH_DETAIL_SUCCESS = '@@HistoryOrder/FETCH_DETAIL_SUCCESS',
}

export interface HistoryOrderState {
  readonly loading: boolean;
  readonly data?: HistoryOrder[];
  readonly errors?: string;
  readonly dougnutData?: any;
  readonly detail?: HistoryDetail[];
}
