import { Reducer } from 'redux';
import { HistoryOrderState, HistoryOrderActionTypes } from './types';

export const initialState: HistoryOrderState = {
  data: [],
  errors: undefined,
  loading: false,
  dougnutData: undefined,
  detail: undefined,
};

const reducer: Reducer<HistoryOrderState> = (state = initialState, action) => {
  switch (action.type) {
    case HistoryOrderActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true, params: action.params };
    }
    case HistoryOrderActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case HistoryOrderActionTypes.FETCH_DETAIL: {
      return { ...state, loading: true, params: action.params };
    }
    case HistoryOrderActionTypes.FETCH_DETAIL_SUCCESS: {
      return { ...state, loading: false, detail: action.payload };
    }
    case HistoryOrderActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    case HistoryOrderActionTypes.FETCH_DOUGHNUT_DATA: {
      return { ...state, loading: false, dougnutData: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as HistoryOrderReducer };
