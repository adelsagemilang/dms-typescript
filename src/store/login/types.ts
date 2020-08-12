export type ApiResponse = Record<string, any>;
export interface LoginAuth {
  email: string;
  password: string;
}
export interface InterfaceLogin {
  readonly email: string;
  readonly password: string;
}

export interface LoginState {
  readonly loading: boolean;
  readonly data: [];
  readonly auth?: LoginAuth;
  readonly errors?: string;
}

export enum LoginActionTypes {
  STORE_DATA = '@@Login/STORE_DATA',
  SET_DATA = '@@Login/SET_DATA',
  FETCH_ERROR = '@@Login/FETCH_ERROR',
}
