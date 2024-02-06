import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    'Accept': "application/json"
  }
});

axiosConfig.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const originalRequest = error.config;
    if (error.response.status == 401 && originalRequest.url == 'http://127.0.0.1:3000/login') {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default axiosConfig;