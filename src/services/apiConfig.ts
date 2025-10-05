import axios from 'axios';

// Em desenvolvimento usamos o proxy do Vite ("/api").
// Em produção (GitHub Pages, Vercel, etc), precisamos da URL absoluta da API.
// Configure via VITE_API_BASE_URL nos arquivos .env*
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
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
