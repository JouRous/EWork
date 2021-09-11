import { store } from 'store';
import http from './axios-instance';

type StoreType = typeof store;

export const setupInterceptor = (store: StoreType) => {
  http.interceptors.request.use(
    (config) => {
      const accessToken = store.getState().auth.accessToken;

      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
};
