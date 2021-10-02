import axiosInstance from './axios-instance';
import { from } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { map } from 'rxjs/operators';

const get = <T>(path: string, options?: AxiosRequestConfig) => {
  const request = axiosInstance.get<T>(path, { ...options });
  return from(request).pipe(map((response) => response.data));
};

const post = <T>(path: string, data: any, options?: AxiosRequestConfig) => {
  const request = axiosInstance.post<T>(path, data, { ...options });
  return from(request);
};

const path = <T>(path: string, data: any, options?: AxiosRequestConfig) => {
  const request = axiosInstance.patch<T>(path, data, { ...options });
  return from(request);
};

const http = {
  get,
  post,
  path,
};

export default http;
