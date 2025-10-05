import axios from 'axios';

// Em desenvolvimento usamos o proxy do Vite ("/api").
// Em produção (GitHub Pages, Vercel, etc), precisamos da URL absoluta da API.
// Configure via VITE_API_BASE_URL nos arquivos .env*
// Configuração da URL base da API
const getBaseURL = () => {
    // Sempre usar URL absoluta da API
    const baseURL = 'https://api.milhaspix.com';
    console.log('API Base URL configurada:', baseURL);
    return baseURL;
};

const api = axios.create({
    baseURL: getBaseURL(),
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
});

api.interceptors.response.use(
    (response) => {
        console.log('API Response sucesso:', {
            url: response.config?.url,
            status: response.status,
            data: response.data
        });
        return response;
    },
    (error) => {
        console.error('Interceptor - Erro na API:', {
            url: error.config?.url,
            baseURL: error.config?.baseURL,
            fullURL: error.config?.baseURL + error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            message: error.message,
            data: error.response?.data
        });
        return Promise.reject(error);
    }
);

export default api;
