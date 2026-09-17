import axios, { type AxiosRequestConfig } from 'axios';
import { normalizeError } from './apiError';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeError(error)),
);

async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await instance.request<T>(config);
  return response.data;
}

export const http = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'GET', url }),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'POST', url, data }),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'PUT', url, data }),
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'PATCH', url, data }),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'DELETE', url }),
};
