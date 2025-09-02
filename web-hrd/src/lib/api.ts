import axios from "axios";
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || "http://localhost:3000/api",
});
api.interceptors.request.use((cfg) => {
    const t = localStorage.getItem("accessToken");
    if (t) cfg.headers.Authorization = `Bearer ${t}`;
    return cfg;
});
