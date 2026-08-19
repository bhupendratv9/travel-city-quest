import { InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

// The precise shape of the 'data' property returned by Google
export type GoogleUserInfo = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email?: string;
  email_verified?: boolean;
  locale?: string;
};

// The exact structure of the entire Axios response object you provided
export type FullAxiosGoogleResponse = {
  data: GoogleUserInfo;
  status: number;
  statusText: string;
  headers: AxiosHeaders;
  config: InternalAxiosRequestConfig;
  request: XMLHttpRequest;
};