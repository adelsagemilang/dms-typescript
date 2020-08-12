export const Quantity = {
  route: 0,
  volume: 0,
  weight: 0,
  total_trips: 0,
  active_trucks: 0,
  active_transporter: 0,
  total_transporter: 0,
  total_weight: 0,
  average_weight: 0,
  total_volume: 0,
  average_volume: 0,
  average_truck: 0,
  average_transporter: 0,
  day_per_trip: 0,
  km_per_trip: 0,
};

export enum QuantityActions {
  GET_DATA_REQUEST = '@@QUANTITY/GET_DATA_REQUEST',
  GET_DATA_SUCCESS = '@@QUANTITY/GET_DATA_SUCCESS',
  GET_DATA_FAILURE = '@@QUANTITY/GET_DATA_FAILURE',
}

export const Financial = {
  total_cost: 0,
  average_price: 0,
};

export enum FinancialActions {
  GET_DATA_REQUEST = '@@FINANCIAL/GET_DATA_REQUEST',
  GET_DATA_SUCCESS = '@@FINANCIAL/GET_DATA_SUCCESS',
  GET_DATA_FAILURE = '@@FINANCIAL/GET_DATA_FAILURE',
}
