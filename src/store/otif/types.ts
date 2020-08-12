export type ApiResponse = Record<string, any>;

export interface OTIFList extends ApiResponse {
  data: OTIFItem[];
  total_page: number;
}

export interface OTIFItem {
  job_order_number: string;
  from: string;
  to: string;
  truck_type: string;
  license_plate: string;
  transporter: string;
  date_completed: string;
  total_leadtime: number;
  total_kpi: number;
  ticket_count: number;
}

export interface OTIFState {
  readonly loading: boolean;
  readonly dataOTIFList?: OTIFList;
  readonly errors?: string;
  readonly filterData?: any;
}

export enum OTIFActionTypes {
  GET_DATA_LIST = '@@OTIF/GET_DATA_LIST',
  SET_DATA_LIST = '@@OTIF/SET_DATA_LIST',
  FETCH_ERROR = '@@OTIF/FETCH_ERROR',
  FETCH_FILTER_DATA = '@@OTIF/FETCH_FILTER_DATA',
}
