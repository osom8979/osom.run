import 'server-only';

import {StatusCodes} from 'http-status-codes';
import {HttpStatusError} from '@/app/exceptions';

export const DEFAULT_API_TIMEOUT_MILLISECONDS = 8_000;
export const DEFAULT_SUCCESS_STATES = [
  StatusCodes.OK,
  StatusCodes.CREATED,
  StatusCodes.NO_CONTENT,
];

export const osomApiPaths = {
  health: '/health',
  progressCreate: '/progress/create',
  progressIncrease: '/progress/increase',
};

export interface HealthResponse {
  mq: boolean;
}

export interface ProgressCreateResponse {
  id: string;
}

export interface ProgressIncreaseResponse {
  value: number;
}

export interface ApiClientOptions {
  timeout?: number;
  successStates?: Array<number>;
  url?: string;
  key?: string;
}

type FetchParameters = Parameters<typeof fetch>;
type RequestOptions = FetchParameters[1];
type RequestOptionsWithoutMethod = Omit<RequestOptions, 'method'>;

export class OsomApiServerSideClient {
  defaultTimeout: number;
  successStates: Array<number>;
  url: string;
  key: string;

  constructor(options?: ApiClientOptions) {
    this.defaultTimeout = options?.timeout ?? DEFAULT_API_TIMEOUT_MILLISECONDS;
    this.successStates = options?.successStates ?? DEFAULT_SUCCESS_STATES;
    this.url = options?.url ?? process.env['OSOM_API_URL'] ?? 'http://localhost:10503';
    this.key = options?.key ?? process.env['OSOM_API_KEY'] ?? '-';
  }

  async request<T = any>(pathname: string, init?: RequestOptions) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.defaultTimeout);
    const signal = controller.signal;
    const headers = {authorization: `Bearer ${this.key}`};

    try {
      const input = new URL(pathname, this.url);
      const response = await fetch(input, {signal, ...init, headers});
      if (!this.successStates.includes(response.status)) {
        throw new HttpStatusError(response.status);
      }
      const result = await response.json();
      return result as T;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async get<T = any>(pathname: string, init?: RequestOptionsWithoutMethod) {
    return await this.request<T>(pathname, {method: 'GET', ...init});
  }

  async post<T = any>(pathname: string, init?: RequestOptionsWithoutMethod) {
    return await this.request<T>(pathname, {method: 'POST', ...init});
  }

  async put(pathname: string, init?: RequestOptionsWithoutMethod) {
    await this.request(pathname, {method: 'PUT', ...init});
  }

  async delete(pathname: string, init?: RequestOptionsWithoutMethod) {
    await this.request(pathname, {method: 'DELETE', ...init});
  }

  async health() {
    return await this.post<HealthResponse>(osomApiPaths.health);
  }

  async progressCreate() {
    return await this.post<ProgressCreateResponse>(osomApiPaths.progressCreate);
  }

  async progressIncrease(progressId: string, increaseValue?: number) {
    const data = {progress_id: progressId, increase_value: increaseValue};
    const body = JSON.stringify(data);
    return await this.post<ProgressIncreaseResponse>(osomApiPaths.progressIncrease, {
      body,
    });
  }
}

export default function createOsomApiServerSideClient() {
  return new OsomApiServerSideClient();
}
