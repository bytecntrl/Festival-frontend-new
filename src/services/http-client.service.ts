import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

class HttpClient {
    private http: AxiosInstance;
    private resetToken: () => void;

    constructor(resetToken: () => void) {
        this.http = axios.create({
            baseURL: process.env.REACT_APP_BASE_URL,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.resetToken = resetToken;

        this.http.interceptors.response.use(
            (response) => {
              return response;
            },
            (error) => {
                if (error.response) {
                    const responseData = error.response.data as { error: boolean; message: string };
        
                    if (
                        error.response.status === 401 && 
                        responseData.error && 
                        responseData.message === 'Invalid JWT token'
                    ) {
                        this.resetToken();
                    }
                }
        
                return Promise.reject(error);
            }
        );
    }

    public async get<T>(url: string, params = {}, config: AxiosRequestConfig = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.http.get(url, { params, ...config });
            return response.data;
        } catch (error) {
            return this.handleRequestError<T>(error as AxiosError);
        }
    }

    public async post<T>(url: string, data = {}, config: AxiosRequestConfig = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.http.post(url, data, config);
            return response.data;
        } catch (error) {
            return this.handleRequestError<T>(error as AxiosError);
        }
    }

    public async put<T>(url: string, data = {}, config: AxiosRequestConfig = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.http.put(url, data, config);
            return response.data;
        } catch (error) {
            return this.handleRequestError<T>(error as AxiosError);
        }
    }

    public async delete<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.http.delete(url, config);
            return response.data;
        } catch (error) {
            return this.handleRequestError<T>(error as AxiosError);
        }
    }

    public setHeader(name: string, value: string): void {
        this.http.defaults.headers.common[name] = value;
    }

    private handleRequestError<T>(error: AxiosError): T {
        if (error.response) {
            const responseData = error.response.data as { error: boolean; message: string };
      
            if (error.response.status === 401 && responseData.error === true) {
                console.error('JWT error:', responseData.message);
            }
        
            return error.response.data as T;
        } else if (error.request) {
            console.error('Nessuna risposta ricevuta:', error.request);
        } else {
            console.error('Errore durante la richiesta:', error.message);
        }
      
        return {} as T;
    }
}

export default HttpClient;
