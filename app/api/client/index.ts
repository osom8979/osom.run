import {StatusCodes} from 'http-status-codes';
import type {EmptyResponse} from '@/app/api/interface';
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

  async request<T = any>(input: RequestInput, init?: RequestOptions) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.defaultTimeout);
    const signal = controller.signal;

    try {
      const response = await fetch(input, {signal, ...init});
      if (response.status != StatusCodes.OK) {
        throw new HttpStatusError(response.status);
      }
      const result = await response.json();
      return result as T;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async get<T = any>(input: RequestInput, init?: RequestOptionsWithoutMethod) {
    return await this.request<T>(input, {method: 'GET', ...init});
  }

  async post<T = any>(input: RequestInput, init?: RequestOptionsWithoutMethod) {
    return await this.request<T>(input, {method: 'POST', ...init});
  }

  async put(input: RequestInput, init?: RequestOptionsWithoutMethod) {
    await this.request(input, {method: 'PUT', ...init});
  }

  async delete(input: RequestInput, init?: RequestOptionsWithoutMethod) {
    await this.request(input, {method: 'DELETE', ...init});
  }

  async login(email: string, password: string) {
    const body = new FormData();
    body.set('email', email);
    body.set('password', password);
    return await this.post<EmptyResponse>('/api/auth/login', {body});
  }

  async logout() {
    return await this.post<EmptyResponse>('/api/auth/logout');
  }

  async signup(email: string, password: string) {
    const body = new FormData();
    body.set('email', email);
    body.set('password', password);
    return await this.post<EmptyResponse>('/api/auth/signup', {body});
  }

  async resetPassword(email: string) {
    const body = new FormData();
    body.set('email', email);
    return await this.post<EmptyResponse>('/api/auth/login/reset/password', {body});
  }
}

export const apiClient = new ApiClient();
export default apiClient;
