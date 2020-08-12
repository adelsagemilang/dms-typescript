import { Reducer } from 'redux';
import { KPIActionTypes, KPIState } from './types';

export const initialState: KPIState = {
  dataKPITotal: undefined,
  dataKPIAssignment: undefined,
  dataKPIPickup: undefined,
  dataKPIDelivery: undefined,
  dataKPIDropoff: undefined,
  errors: undefined,
  loading: false,
  filterData: undefined,
};

const reducer: Reducer<KPIState> = (state = initialState, action) => {
  switch (action.type) {
    case KPIActionTypes.GET_DATA_TOTAL: {
      return { ...state, loading: true };
    }
    case KPIActionTypes.SET_DATA_TOTAL: {
      return { ...state, loading: false, dataKPITotal: action.payload };
    }

    case KPIActionTypes.GET_DATA_ASSIGNMENT: {
      return { ...state, loading: true };
    }
    case KPIActionTypes.SET_DATA_ASSIGNMENT: {
      return { ...state, loading: false, dataKPIAssignment: action.payload };
    }

    case KPIActionTypes.GET_DATA_PICKUP: {
      return { ...state, loading: true };
    }
    case KPIActionTypes.SET_DATA_PICKUP: {
      return { ...state, loading: false, dataKPIPickup: action.payload };
    }

    case KPIActionTypes.GET_DATA_DELIVERY: {
      return { ...state, loading: true };
    }
    case KPIActionTypes.SET_DATA_DELIVERY: {
      return { ...state, loading: false, dataKPIDelivery: action.payload };
    }

    case KPIActionTypes.GET_DATA_DROPOFF: {
      return { ...state, loading: true };
    }
    case KPIActionTypes.SET_DATA_DROPOFF: {
      return { ...state, loading: false, dataKPIDropoff: action.payload };
    }

    case KPIActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    case KPIActionTypes.FETCH_FILTER_DATA: {
      return { ...state, loading: false, filterData: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as KPIReducer };
