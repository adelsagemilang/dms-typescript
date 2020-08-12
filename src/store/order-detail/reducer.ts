import { Reducer } from 'redux';
import { OrderDetailState, OrderDetailActions } from './types';

export const initialState: OrderDetailState = {
  dataOrderDetail: undefined,
  errors: undefined,
  loading: false,
};

const reducer: Reducer<OrderDetailState> = (state = initialState, action) => {
  switch (action.type) {
    case OrderDetailActions.GET_ORDER_DETAIL: {
      return { ...state, loading: true, uuid: action.uuid };
    }
    case OrderDetailActions.SET_ORDER_DETAIL: {
      return { ...state, loading: false, dataOrderDetail: action.payload };
    }
    case OrderDetailActions.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    case OrderDetailActions.FETCH_FILTER_DATA: {
      return { ...state, loading: false, filterData: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as OrderDetailReducer };
