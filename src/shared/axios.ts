import axios, { AxiosInstance } from 'axios';
import config from '../config';

const HttpServices = (baseUrl: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 3000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return error;
    }
  );
  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return instance;
};

const AuthService = HttpServices(config.authServiceUrl);
const CoreService = HttpServices(config.coreServiceUrl);

export default HttpServices;
