export type ApiResponse = Record<string, any>;

export interface OrderDetailResponse extends ApiResponse {
  data: OrderDetail;
}

export interface DeliveryOrderList {
  deliveryorderseqno: number;
  commodityitemcd: number;
  commodityitemname: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  itemqty: number;
  userinput: number;
  created_at: Date;
}

export interface DeliveryOrder {
  _id: string;
  delivery_order_id: number;
  created_at: Date;
  delivery_order_code: string;
  delivery_order_date?: any;
  delivery_order_list: DeliveryOrderList[];
  delivery_order_lon_lat?: any;
  delivery_order_remarks?: any;
  delivery_order_status: number;
  deliveryorderseqno: number;
  extra_action_id: number;
  is_reported: boolean;
  job_order_id: number;
  media_id?: any;
  receiver_name?: any;
  receiver_photo?: any;
  receiver_sign?: any;
  sales_order_reference: string;
  total_item: string;
  total_volume: string;
  total_weight: string;
  updated_at: Date;
  user_confirm: number;
  user_confirm_date: Date;
  user_edit: number;
  user_input: number;
}

export interface OrderDetailHistory {
  diff: number;
  kpi: number;
  pic: string;
}

export interface ExtraPickDrop {
  _id: string;
  extra_action_id: number;
  extra_type: number;
  job_order_id: number;
  location_address: string;
  location_id: number;
  location_name: string;
  lonlat: string;
  status: number;
}

export interface Destination {
  name: string;
  region: string;
  address: string;
}

interface Ticket {
  ticketcd: number;
  descs: string;
  updated_at: string;
}

export interface OrderDetail {
  _id: string;
  delivery_order: DeliveryOrder[];
  extra_pick: ExtraPickDrop[];
  extra_drop: ExtraPickDrop[];
  job_order_number: number;
  vehicle_license_no: string;
  vehicle_type: number;
  driver_name: string;
  insurance?: any;
  company_executor_name: string;
  company_creator_name: string;
  total_leadtime: number;
  time_left: number;
  from: Destination;
  to: Destination;
  leadtime: number;
  kpi: number;
  ticket_count: number;
  ticket: Ticket[];
  transporter: OrderDetailHistory;
  truck: OrderDetailHistory;
  dispatch: OrderDetailHistory;
  arrival: OrderDetailHistory;
  inspection: OrderDetailHistory;
  waiting_loading: OrderDetailHistory;
  loading: OrderDetailHistory;
  gate_out: OrderDetailHistory;
  delivery: OrderDetailHistory;
  inspection_destination: OrderDetailHistory;
  waiting_unloading: OrderDetailHistory;
  unloading: OrderDetailHistory;
  checkout: OrderDetailHistory;
}

export interface OrderDetailState {
  readonly loading: boolean;
  // readonly dataOrderDetail?: OrderDetailResponse;
  readonly dataOrderDetail?: OrderDetail;
  readonly extraPick?: ExtraPickDrop;
  readonly extraDrop?: ExtraPickDrop;
  readonly destinationOrder?: any;
  readonly errors?: string;
}

export enum OrderDetailActions {
  GET_ORDER_DETAIL = '@@OTIF/GET_ORDER_DETAIL',
  SET_ORDER_DETAIL = '@@OTIF/SET_ORDER_DETAIL',
  FETCH_ERROR = '@@OTIF/FETCH_ERROR',
  FETCH_FILTER_DATA = '@@OTIF/FETCH_FILTER_DATA',

  // ORDER_DETAIL_REQUEST = '@@ORDER_DETAIL_REQUEST',
  // ORDER_DETAIL_SUCCESS = '@@ORDER_DETAIL_SUCCESS',
  // ORDER_DETAIL_FAILURE = '@@ORDER_DETAIL_FAILURE',
}
