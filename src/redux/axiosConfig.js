import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://platz-ua-back.vercel.app/api'
});

export const setupAxiosInterceptors = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default axiosInstance;
