import axios from 'axios';
import { API_ROOT, TIMEOUT } from '@/constants/api';

const api = axios.create({
    baseURL: API_ROOT,
    timeout: TIMEOUT,
    headers: {
        Accept: 'application/json',
    },
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    } else if (typeof config.data === 'object') {
        config.headers['Content-Type'] = 'application/json';
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403 || error.response?.status === 401) {
            window.location.href = '/login';
            localStorage.removeItem('phone');
            localStorage.removeItem('user-storage');
        }
        return Promise.reject(error);
    }
);

export default api;
