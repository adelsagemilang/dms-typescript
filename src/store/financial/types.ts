export const ChartFinancials = {
  isLoading: false,
  chartData: {
    title: '',
    data: [],
  },
};

export const TotalOrder = {
  total_cost: 0,
  average_price: 0,
  total_order: 0,
};

export enum FinancialActions {
  TOTAL_COST_REQUEST = '@@QUANTITY/TOTAL_COST_REQUEST',
  TOTAL_COST_SUCCESS = '@@QUANTITY/TOTAL_COST_SUCCESS',
  TOTAL_COST_FAILURE = '@@QUANTITY/TOTAL_COST_FAILURE',

  AVERAGE_PRICE_REQUEST = '@@QUANTITY/AVERAGE_PRICE_REQUEST',
  AVERAGE_PRICE_SUCCESS = '@@QUANTITY/AVERAGE_PRICE_SUCCESS',
  AVERAGE_PRICE_FAILURE = '@@QUANTITY/AVERAGE_PRICE_FAILURE',

  TOTAL_ORDER_REQUEST = '@@QUANTITY/TOTAL_ORDER_REQUEST',
  TOTAL_ORDER_SUCCESS = '@@QUANTITY/TOTAL_ORDER_SUCCESS',
  TOTAL_ORDER_FAILURE = '@@QUANTITY/TOTAL_ORDER_FAILURE',
}
