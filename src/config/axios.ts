import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_ENDPOINT
};

const api = axios.create(config);

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token != null) {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem("token")}`
    }
    return config;
});

export default api;