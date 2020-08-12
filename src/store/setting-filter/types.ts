export type ApiResponse = Record<string, any>;
export interface ListItem extends ApiResponse {
  year: any;
  month: any;
  locations: any[];
  transporters: any[];
}

export interface LocationTransporterData {
  id: number;
  name: string;
}

export interface LocationDataName {
  id: number;
  name: string;
}

export interface SettingFilterState {
  readonly loading: boolean;
  readonly dataLocation: LocationTransporterData[];
  readonly dataTransporter: LocationTransporterData[];
  readonly dataInitial: any;
  readonly errors?: string;
  readonly filterData?: any;
}

export enum SettingFilterActionTypes {
  GET_DATA_LOCATION = '@@SettingFilter/GET_DATA_LOCATION',
  SET_DATA_LOCATION = '@@SettingFilter/SET_DATA_LOCATION',
  GET_DATA_TRANSPORTER = '@@SettingFilter/GET_DATA_TRANSPORTER',
  SET_DATA_TRANSPORTER = '@@SettingFilter/SET_DATA_TRANSPORTER',
  GET_DATA_INITIAL = '@@SettingFilter/GET_DATA_INITIAL',
  SET_DATA_INITIAL = '@@SettingFilter/SET_DATA_INITIAL',
  FETCH_ERROR = '@@SettingFilter/FETCH_ERROR',
  FETCH_FILTER_DATA = '@@SettingFilter/FETCH_FILTER_DATA',
}
