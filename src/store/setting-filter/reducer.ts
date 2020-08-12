import { Reducer } from 'redux';
import { SettingFilterState, SettingFilterActionTypes } from './types';

export const initialState: SettingFilterState = {
  dataLocation: [],
  dataTransporter: [],
  dataInitial: undefined,
  errors: undefined,
  loading: false,
  filterData: undefined,
};

const reducer: Reducer<SettingFilterState> = (state = initialState, action) => {
  switch (action.type) {
    case SettingFilterActionTypes.GET_DATA_LOCATION: {
      return { ...state, loading: true };
    }
    case SettingFilterActionTypes.SET_DATA_LOCATION: {
      return { ...state, loading: false, dataLocation: action.payload };
    }
    case SettingFilterActionTypes.GET_DATA_TRANSPORTER: {
      return { ...state, loading: true };
    }
    case SettingFilterActionTypes.SET_DATA_TRANSPORTER: {
      return { ...state, loading: false, dataTransporter: action.payload };
    }
    case SettingFilterActionTypes.GET_DATA_INITIAL: {
      return { ...state, loading: true };
    }
    case SettingFilterActionTypes.SET_DATA_INITIAL: {
      return { ...state, loading: false, dataInitial: action.payload };
    }
    case SettingFilterActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    case SettingFilterActionTypes.FETCH_FILTER_DATA: {
      return { ...state, loading: false, filterData: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as settingFilterReducer };
