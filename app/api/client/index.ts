import {StatusCodes} from 'http-status-codes';
import {HttpStatusError} from '@/app/exceptions';

export const DEFAULT_API_TIMEOUT_MILLISECONDS = 8_000;

export interface ApiClientOptions {
  timeout?: number;
}

type FetchParameters = Parameters<typeof fetch>;
type RequestInput = FetchParameters[0];
type RequestOptions = FetchParameters[1];
type RequestOptionsWithoutMethod = Omit<RequestOptions, 'method'>;

export class ApiClient {
  defaultTimeout: number;

  constructor(options?: ApiClientOptions) {
    this.defaultTimeout = options?.timeout ?? DEFAULT_API_TIMEOUT_MILLISECONDS;
  }

  async request(input: RequestInput, init?: RequestOptions) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.defaultTimeout);
    const signal = controller.signal;

    try {
      return await fetch(input, {signal, ...init}).then(response => {
        switch (response.status) {
          case StatusCodes.OK:
            return;
          default:
            throw new HttpStatusError(response.status);
        }
      });
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async get(input: RequestInput, init?: RequestOptionsWithoutMethod) {
    return await this.request(input, {method: 'GET', ...init});
  }

  async post(input: RequestInput, init?: RequestOptionsWithoutMethod) {
    return await this.request(input, {method: 'POST', ...init});
  }

  async put(input: RequestInput, init?: RequestOptionsWithoutMethod) {
    return await this.request(input, {method: 'PUT', ...init});
  }

  async delete(input: RequestInput, init?: RequestOptionsWithoutMethod) {
    return await this.request(input, {method: 'DELETE', ...init});
  }

  async login(email: string, password: string) {
    const body = new FormData();
    body.set('email', email);
    body.set('password', password);
    return await this.post('/api/auth/login', {body});
  }
}

export const apiClient = new ApiClient();
export default apiClient;
