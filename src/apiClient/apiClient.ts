import axios from 'axios';

const apiKey = 'live_4yaPeUDj6HG4aQbbQwPa7rk1MCuNR835rhVQkmcatbdlFk3oxmoRXlILFsZ5YsQn';

const axiosInstance = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: {
    'x-api-key': apiKey,
  },
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error.response?.data?.message || error.message || 'An error occurred';
  }
);

export default axiosInstance;
