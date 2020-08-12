import { action } from 'typesafe-actions';
import { LayoutActionTypes } from 'layout';

export const showBackButton = (isShowBackButton: boolean, backUrl?: string) =>
  action(LayoutActionTypes.SHOW_BACK_BUTTON, isShowBackButton, backUrl);
export const showViewSettings = (isShowViewSettings: boolean) =>
  action(LayoutActionTypes.SHOW_VIEW_SETTINGS, isShowViewSettings);
export const setAdminLayout = (isAdmin: boolean) =>
  action(LayoutActionTypes.SET_ADMIN_LAYOUT, isAdmin);
export const refreshData = (isRefreshData: boolean) =>
  action(LayoutActionTypes.REFRESH_DATA, isRefreshData);
