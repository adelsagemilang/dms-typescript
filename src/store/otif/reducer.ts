import { Reducer } from 'redux';
import { OTIFState, OTIFActionTypes } from './types';

export const initialState: OTIFState = {
  dataOTIFList: undefined,
  errors: undefined,
  loading: false,
  filterData: undefined,
};

const reducer: Reducer<OTIFState> = (state = initialState, action) => {
  switch (action.type) {
    case OTIFActionTypes.GET_DATA_LIST: {
      return { ...state, loading: true, params: action.params };
    }
    case OTIFActionTypes.SET_DATA_LIST: {
      return { ...state, loading: false, dataOTIFList: action.payload };
    }

    case OTIFActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    case OTIFActionTypes.FETCH_FILTER_DATA: {
      return { ...state, loading: false, filterData: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as OTIFReducer };
