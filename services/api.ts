import axios from 'axios';
import { API_ROOT, TIMEOUT } from '@/constants/api';

const api = axios.create({
    baseURL: API_ROOT,
    timeout: TIMEOUT,
    headers: {
        Accept: 'application/json',
    },
    withCredentials: true
});

api.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    } else if (typeof config.data === 'object') {
        config.headers['Content-Type'] = 'application/json';
    }
    return config;
});

export default api;
