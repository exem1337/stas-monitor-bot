import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL;
const $api = axios.create({
   withCredentials: true,
   baseURL: API_URL
})


$api.interceptors.response.use((config) => {
   return config;
}, async (error) => {
   const originalRequest = error.config;
   if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
         return $api.request(originalRequest);
      } catch (e) {
         console.log("Пользователь не авторизован")
      }
   }
   throw error;
})

export default $api;