import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import useTokenJwt, { TokenJwt } from '../stores/token-jwt';

const errorInterceptor = (token: TokenJwt, navigate: NavigateFunction) => {
    return (error: any) => {
        if (error.response) {
            const responseData = error.response.data;

            if (
                error.response.status === 401 &&
                responseData.error &&
                responseData.message === 'Invalid JWT token'
            ) {
                token.reset();
                navigate('/login');
            }
        }

        return Promise.reject(error);
    };
}

const useHttpClient = () => {
    const navigate = useNavigate();
    const token = useTokenJwt();
    const http = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    useEffect(() => {
        const interceptors = http.interceptors.response.use((response) => response, errorInterceptor(token, navigate));

        return () => {
            http.interceptors.response.eject(interceptors);
        };
    }, [http, token, navigate]);

    const get = async <T>(url: string, params = {}, config: AxiosRequestConfig = {}) => {
        try {
            const response: AxiosResponse<T> = await http.get(url, { params, ...config });
            return response.data;
        } catch (error) {
            return handleRequestError<T>(error as AxiosError);
        }
    };

    const post = async <T>(url: string, data = {}, config: AxiosRequestConfig = {}) => {
        try {
            const response: AxiosResponse<T> = await http.post(url, data, config);
            return response.data;
        } catch (error) {
            return handleRequestError<T>(error as AxiosError);
        }
    };

    const put = async <T>(url: string, data = {}, config: AxiosRequestConfig = {}) => {
        try {
            const response: AxiosResponse<T> = await http.put(url, data, config);
            return response.data;
        } catch (error) {
            return handleRequestError<T>(error as AxiosError);
        }
    };

    const remove = async <T>(url: string, config: AxiosRequestConfig = {}) => {
        try {
            const response: AxiosResponse<T> = await http.delete(url, config);
            return response.data;
        } catch (error) {
            return handleRequestError<T>(error as AxiosError);
        }
    };

    const setHeader = () => {
        http.defaults.headers.common["Authorization"] = `Bearer ${token.tokenJwt}`;
    };

    const handleRequestError = <T>(error: AxiosError): T => {
        if (error.response) {
            return error.response.data as T;
        } else if (error.request) {
            console.error('Nessuna risposta ricevuta:', error.request);
        } else {
            console.error('Errore durante la richiesta:', error.message);
        }

        return { error: true, message: error.message } as T;
    };

    return { get, post, put, remove, setHeader };
};

export default useHttpClient;
