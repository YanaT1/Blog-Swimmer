import axios, {AxiosRequestConfig} from 'axios';
import {AuthResponse} from '../models/response/AuthResponse';



interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _isRetry?: boolean;
}


const $host = axios.create({
  baseURL: "https://ivantryputen.com/api",
  withCredentials: true,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

$authHost.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

$authHost.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config as RetryAxiosRequestConfig;

    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(
          `${process.env.REACT_APP_API_URL}/user/auth`,
          { withCredentials: true }
        );

        localStorage.setItem('token', response.data.accessToken);

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return $authHost.request(originalRequest);
      } catch (e) {
        console.log('User not logged in (refresh failed)');
        localStorage.removeItem('token'); 
      }
    }

    throw error;
  }
);

export {
  $host,
  $authHost,
};
