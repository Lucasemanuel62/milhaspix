import axios from 'axios';

// Configuração base do axios
const api = axios.create({
    baseURL: '/api',
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('Interceptor - Erro na API:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            message: error.message,
            data: error.response?.data
        });
        return Promise.reject(error);
    }
);

export default api;
