import { Reducer } from 'redux';
import { LayoutState, LayoutActionTypes } from './types';

export const initialState: LayoutState = {
  isAdmin: false,
  isShowBackButton: false,
  isRefreshData: false,
  isShowViewSettings: true,
};

const LayoutReducer: Reducer<LayoutState> = (state = initialState, action) => {
  switch (action.type) {
    case LayoutActionTypes.SHOW_BACK_BUTTON: {
      return {
        ...state,
        isShowBackButton: action.payload,
        backUrl: action.meta,
      };
    }
    case LayoutActionTypes.SHOW_VIEW_SETTINGS: {
      return {
        ...state,
        isShowViewSettings: action.payload,
      };
    }
    case LayoutActionTypes.SET_ADMIN_LAYOUT: {
      return { ...state, isAdmin: action.payload };
    }
    case LayoutActionTypes.REFRESH_DATA: {
      return { ...state, isRefreshData: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default LayoutReducer;
