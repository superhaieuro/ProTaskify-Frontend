import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_ENDPOINT
};

const api = axios.create(config);

api.interceptors.request.use((config) => {
    const userInfo = sessionStorage.getItem("userSession");
    if (userInfo != null) {
        const token = JSON.parse(userInfo).token;
        if (token != null) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
    }
    return config;
});

export default api;