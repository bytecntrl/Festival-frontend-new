import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

class HttpClient {
    private http: AxiosInstance;

    constructor() {
        this.http = axios.create({
            baseURL: process.env.REACT_APP_BASE_URL, // sostituisci con l'URL della tua API
            timeout: 5000, // tempo massimo di attesa per la risposta (in millisecondi)
            headers: {
                'Content-Type': 'application/json', // specifica il tipo di dati che invii
            },
        });
    }

    public async get<T>(url: string, params = {}, config: AxiosRequestConfig = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.http.get(url, { params, ...config });
            return response.data;
        } catch (error) {
            this.handleRequestError(error as AxiosError);
            return {} as T;
        }
    }

    public async post<T>(url: string, data = {}, config: AxiosRequestConfig = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.http.post(url, data, config);
            return response.data;
        } catch (error) {
            this.handleRequestError(error as AxiosError);
            return {} as T;
        }
    }

    public async put<T>(url: string, data = {}, config: AxiosRequestConfig = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.http.put(url, data, config);
            return response.data;
        } catch (error) {
            this.handleRequestError(error as AxiosError);
            return {} as T;
        }
    }

    public async delete<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.http.delete(url, config);
            return response.data;
        } catch (error) {
            this.handleRequestError(error as AxiosError);
            return {} as T;
        }
    }

    public setHeader(name: string, value: string): void {
        this.http.defaults.headers.common[name] = value;
    }

    private handleRequestError(error: AxiosError): void {
        if (error.response) {
            console.error('Errore di risposta:', error.response.status);
            
            const responseData = error.response.data as { error: boolean; message: string };
            
            console.error('Messaggio di errore:', responseData.message);

            if (error.response.status === 401 && responseData.error === true) {
                console.error('JWT error:', responseData.message);
            }
        } else if (error.request) {
            console.error('Nessuna risposta ricevuta:', error.request);
        } else {
            console.error('Errore durante la richiesta:', error.message);
        }
    }
}

export default HttpClient;
