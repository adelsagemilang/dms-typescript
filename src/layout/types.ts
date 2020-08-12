import * as Actions from './actions';

export enum LayoutActionTypes {
  SHOW_BACK_BUTTON = '@@layout/SHOW_BACK_BUTTON',
  SHOW_VIEW_SETTINGS = '@@layout/SHOW_VIEW_SETTINGS',
  SET_ADMIN_LAYOUT = '@@layout/SET_ADMIN_LAYOUT',
  REFRESH_DATA = '@@layout/REFRESH_DATA',
}

export interface LayoutState {
  children?: JSX.Element;
  isAdmin?: boolean;
  router?: any;
  isShowBackButton?: boolean;
  isShowViewSettings?: boolean;
  isRefreshData?: boolean;
}

export interface LayoutActionStateTypes extends LayoutState {
  showBackButton?: typeof Actions.showBackButton;
  showViewSettings?: typeof Actions.showViewSettings;
  setAdminLayout?: typeof Actions.setAdminLayout;
  refreshData?: typeof Actions.refreshData;
}
