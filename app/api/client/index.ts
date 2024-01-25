import {StatusCodes} from 'http-status-codes';
import type {EmptyResponse, LoginOAuthResponse} from '@/app/api/interface';
import {HttpStatusError, NoUrlError} from '@/app/exceptions';
import {apiPaths} from '@/app/paths';

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
    return await this.post<EmptyResponse>(apiPaths.login, {body});
  }

  async loginOAuth(provider: string) {
    const body = new FormData();
    body.set('provider', provider);
    const {url} = await this.post<LoginOAuthResponse>(apiPaths.loginOAuth, {body});
    if (!url) {
      throw new NoUrlError();
    }
    return {url} as Required<LoginOAuthResponse>;
  }

  async logout() {
    return await this.post<EmptyResponse>(apiPaths.logout);
  }

  async signup(email: string, password: string) {
    const body = new FormData();
    body.set('email', email);
    body.set('password', password);
    return await this.post<EmptyResponse>(apiPaths.signup, {body});
  }

  async passwordResetRequest(email: string) {
    const body = new FormData();
    body.set('email', email);
    return await this.post<EmptyResponse>(apiPaths.passwordResetRequest, {body});
  }

  async passwordResetUpdate(code: string, password: string) {
    const body = new FormData();
    body.set('code', code);
    body.set('password', password);
    return await this.post<EmptyResponse>(apiPaths.passwordResetUpdate, {body});
  }

  async updateUserMetadata(data: any) {
    return await this.put(apiPaths.userMetadata, {
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient();
export default apiClient;
