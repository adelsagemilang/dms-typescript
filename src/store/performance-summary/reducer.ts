import { Reducer } from 'redux';
import {
  PerformanceSummaryState,
  PerformanceSummaryActionTypes,
} from './types';

export const initialState: PerformanceSummaryState = {
  dataOTIF: undefined,
  dataOTIFGraph: undefined,
  dataKPI: undefined,
  dataKPIOverall: undefined,
  dataKPIAssignment: undefined,
  dataKPIDelivery: undefined,
  dataKPIPickup: undefined,
  dataKPIDropoff: undefined,
  errors: undefined,
  loading: false,
  filterData: undefined,
};

const reducer: Reducer<PerformanceSummaryState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case PerformanceSummaryActionTypes.GET_DATA_OTIF: {
      return { ...state, loading: true };
    }
    case PerformanceSummaryActionTypes.SET_DATA_OTIF: {
      return { ...state, loading: false, dataOTIF: action.payload };
    }

    case PerformanceSummaryActionTypes.GET_DATA_OTIF_GRAPH: {
      return { ...state, loading: true };
    }
    case PerformanceSummaryActionTypes.SET_DATA_OTIF_GRAPH: {
      return { ...state, loading: false, dataOTIFGraph: action.payload };
    }

    case PerformanceSummaryActionTypes.GET_DATA_KPI: {
      return { ...state, loading: true };
    }
    case PerformanceSummaryActionTypes.SET_DATA_KPI: {
      return { ...state, loading: false, dataKPI: action.payload };
    }

    case PerformanceSummaryActionTypes.GET_DATA_KPI_OVERALL: {
      return { ...state, loading: true };
    }
    case PerformanceSummaryActionTypes.SET_DATA_KPI_OVERALL: {
      return { ...state, loading: false, dataKPIOverall: action.payload };
    }

    case PerformanceSummaryActionTypes.GET_DATA_KPI_ASSIGNMENT: {
      return { ...state, loading: true };
    }
    case PerformanceSummaryActionTypes.SET_DATA_KPI_ASSIGNMENT: {
      return { ...state, loading: false, dataKPIAssignment: action.payload };
    }

    case PerformanceSummaryActionTypes.GET_DATA_KPI_DELIVERY: {
      return { ...state, loading: true };
    }
    case PerformanceSummaryActionTypes.SET_DATA_KPI_DELIVERY: {
      return { ...state, loading: false, dataKPIDelivery: action.payload };
    }

    case PerformanceSummaryActionTypes.GET_DATA_KPI_PICKUP: {
      return { ...state, loading: true };
    }
    case PerformanceSummaryActionTypes.SET_DATA_KPI_PICKUP: {
      return { ...state, loading: false, dataKPIPickup: action.payload };
    }

    case PerformanceSummaryActionTypes.GET_DATA_KPI_DROPOFF: {
      return { ...state, loading: true };
    }
    case PerformanceSummaryActionTypes.SET_DATA_KPI_DROPOFF: {
      return { ...state, loading: false, dataKPIDropoff: action.payload };
    }

    case PerformanceSummaryActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    case PerformanceSummaryActionTypes.FETCH_FILTER_DATA: {
      return { ...state, loading: false, filterData: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as performanceSummaryReducer };
