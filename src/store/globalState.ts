import { createContainer } from 'react-tracked';
import { useReducer, Reducer } from 'react';
import { getSetting } from 'utils/settingFilterCrypto';

export interface globalFilterType {
  year: any;
  month: any;
  locations: any[];
  transporters: any[];
}

export interface globalFilterTypeObj {
  globalFilter: globalFilterType;
}

const localStorageFilter = getSetting();

export const initialState = {
  globalFilter: {
    year: localStorageFilter.year
      ? localStorageFilter.year
      : new Date().getFullYear(),
    month: localStorageFilter.month ? localStorageFilter.month : 'all',
    locations: localStorageFilter.location
      ? localStorageFilter.location
      : ['all'],
    transporters: localStorageFilter.transporter
      ? localStorageFilter.transporter
      : ['all'],
  },
};

type State = typeof initialState;

export type Action = {
  type: string;
  globalFilter?: globalFilterType;
};

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'setGlobalFilter':
      return {
        globalFilter: {
          ...state.globalFilter,
          year: action.globalFilter && action.globalFilter.year,
          month: action.globalFilter && action.globalFilter.month,
          locations: action.globalFilter && action.globalFilter.locations,
          transporters: action.globalFilter && action.globalFilter.transporters,
        },
      };
    case 'setInitViewSetting':
      return {
        globalFilter: {
          ...state.globalFilter,
        },
      };
    default:
      return initialState;
  }
};

const useValue = () => useReducer(reducer, initialState);

export const { Provider, useTracked } = createContainer(useValue);
