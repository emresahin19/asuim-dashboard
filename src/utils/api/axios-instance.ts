import { STATUS_CODE } from '@/types';
import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:31';

const jwtAxiosInstance: AxiosInstance = axios.create({
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: boolean | null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });
    failedQueue = [];
};

jwtAxiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === STATUS_CODE.UNAUTHORIZED && !originalRequest._retry) {
            if (!isRefreshing) {
                isRefreshing = true;
                originalRequest._retry = true;

                try {
                    await axios.post('/api/auth/refresh', {}, { withCredentials: true });
                    // Failed queue'yu çalıştır
                    processQueue(null, true);
                    isRefreshing = false;

                    // Yeni token ile request'i tekrar yap
                    return jwtAxiosInstance(originalRequest);
                } catch (err) {
                    processQueue(err, null);
                    isRefreshing = false;
                    throw err;
                }
            }

            // Diğer request'leri kuyruğa ekle
            return new Promise((resolve, reject) => {
                failedQueue.push({
                    resolve: (token: string) => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        resolve(jwtAxiosInstance(originalRequest));
                    },
                    reject: (err: any) => {
                        reject(err);
                    },
                });
            });
        }

        return Promise.reject(error);
    }
);

const nextApiAxiosInstance: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

export { jwtAxiosInstance, nextApiAxiosInstance }
