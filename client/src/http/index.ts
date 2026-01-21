import axios, {AxiosRequestConfig} from 'axios';
import {AuthResponse} from '../models/response/AuthResponse';
import {user} from '../store/store';



interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _isRetry?: boolean;
}


const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

$authHost.interceptors.request.use((config) => {
  const token = user.accessToken;
  if (token) {
        config.headers.set ('Authorization', `Bearer ${token}`);
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
          {withCredentials: true}
        );

        const newToken = response.data.accessToken;
        user.setAuthData(response.data.user, newToken);

        originalRequest.headers.set('Authorization', `Bearer ${newToken}`);
        return $authHost.request(originalRequest);
      } catch (e) {
        user.setAuthData(null, null);
        console.log('Session expired');
      }
    }
    throw error;
  }
);

export {
  $host,
  $authHost,
};
