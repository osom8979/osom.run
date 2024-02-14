import 'server-only';

import {StatusCodes} from 'http-status-codes';
import type {ProgressValue, ProgressId, ProgressRow} from '@/app/api/interface';
import {HttpStatusError} from '@/app/exceptions';

export const DEFAULT_API_TIMEOUT_MILLISECONDS = 8_000;
export const DEFAULT_SUCCESS_STATES = [
  StatusCodes.OK,
  StatusCodes.CREATED,
  StatusCodes.NO_CONTENT,
];

export interface ApiClientOptions {
  timeout?: number;
  successStates?: Array<number>;
  url?: string;
  key?: string;
}

type FetchParameters = Parameters<typeof fetch>;
type RequestOptions = FetchParameters[1];
type RequestInit = Omit<RequestOptions, 'method' | 'body'>;

class OsomApiServerSideClient {
  defaultTimeout: number;
  successStates: Array<number>;
  url: string;
  key: string;

  constructor(options?: ApiClientOptions) {
    this.defaultTimeout = options?.timeout ?? DEFAULT_API_TIMEOUT_MILLISECONDS;
    this.successStates = options?.successStates ?? DEFAULT_SUCCESS_STATES;
    this.url = options?.url ?? process.env['OSOM_API_URL'] ?? 'http://localhost:10503';
    this.key = options?.key ?? process.env['OSOM_API_KEY'] ?? '';
  }

  async request<T = any, D = any>(pathname: string, data?: D, init?: RequestOptions) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.defaultTimeout);
    const signal = controller.signal;
    const headers = {authorization: `Bearer ${this.key}`};
    const body = data ? JSON.stringify(data) : undefined;

    try {
      const input = new URL(pathname, this.url);
      const response = await fetch(input, {signal, body, ...init, headers});
      if (!this.successStates.includes(response.status)) {
        throw new HttpStatusError(response.status);
      }
      const result = await response.json();
      return result as T;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async get<T = any, D = any>(pathname: string, data?: D, init?: RequestInit) {
    return await this.request<T, D>(pathname, data, {method: 'GET', ...init});
  }

  async post<T = any, D = any>(pathname: string, data?: D, init?: RequestInit) {
    return await this.request<T, D>(pathname, data, {method: 'POST', ...init});
  }

  async put<T = any, D = any>(pathname: string, data?: D, init?: RequestInit) {
    return await this.request<T, D>(pathname, data, {method: 'PUT', ...init});
  }

  async delete<T = any, D = any>(pathname: string, data?: D, init?: RequestInit) {
    return await this.request<T, D>(pathname, data, {method: 'DELETE', ...init});
  }

  async anonymousProgressCreate() {
    return await this.put<ProgressId>('/anonymous/progress');
  }

  async anonymousProgressRead(code: string) {
    return await this.get<ProgressRow>(`/anonymous/progress/${code}`);
  }

  async anonymousProgressIncrease(code: string, options?: ProgressValue) {
    return await this.post<ProgressRow>(
      `/anonymous/progress/${code}/increase`,
      options
    );
  }
}

export default function createOsomApiServerSideClient(options?: ApiClientOptions) {
  return new OsomApiServerSideClient(options);
}
