import 'server-only';

import {StatusCodes} from 'http-status-codes';
import type {EmptyResponse} from '@/app/api/interface';
import {internalServerError, json, ok} from '@/app/api/response';
import {HttpStatusError, type OsomErrorOptions} from '@/app/exceptions';

export const DEFAULT_API_TIMEOUT_MILLISECONDS = 8_000;
export const DEFAULT_SUCCESS_STATES = [
  StatusCodes.OK,
  StatusCodes.CREATED,
  StatusCodes.NO_CONTENT,
];

export interface InsertProgressResponse {
  id: string;
}

export interface SelectProgressResponse {
  value: number;
  expired_at: string;
  created_at: string;
  updated_at?: string;
}

export interface UpdateProgressRequest {
  value: number;
}

export interface IncreaseProgressRequest {
  value?: number;
}

export const osomApiPath = {
  anonymousProgress: '/anonymous/progress',
  anonymousProgressCode: (code: string) => osomApiPath.anonymousProgress + `/${code}`,
  anonymousProgressCodeIncrease: (code: string) => {
    return osomApiPath.anonymousProgressCode(code) + `/increase`;
  },
};

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
    const headers = {
      accept: 'application/json',
      authorization: `Bearer ${this.key}`,
      ['content-type']: 'application/json',
      ...init?.headers,
    };
    const body = data ? JSON.stringify(data) : undefined;

    try {
      const input = new URL(pathname, this.url);
      const response = await fetch(input, {signal, body, ...init, headers});
      const json = await response.json();

      if (!this.successStates.includes(response.status)) {
        const options = {
          code: json.code,
          details: json.details,
          hint: json.hint,
          message: json.message,
        } as OsomErrorOptions;
        throw new HttpStatusError(response.status, options);
      }

      return json as T;
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
    return await this.put<InsertProgressResponse>(osomApiPath.anonymousProgress);
  }

  async anonymousProgressRead(code: string) {
    return await this.get<SelectProgressResponse>(
      osomApiPath.anonymousProgressCode(code)
    );
  }

  async anonymousProgressUpdate(code: string, body: UpdateProgressRequest) {
    return await this.post<SelectProgressResponse>(
      osomApiPath.anonymousProgressCode(code),
      body
    );
  }

  async anonymousProgressIncrease(code: string, body?: IncreaseProgressRequest) {
    return await this.post<SelectProgressResponse>(
      osomApiPath.anonymousProgressCodeIncrease(code),
      body
    );
  }
}

export function createOsomApiServerSideClient(options?: ApiClientOptions) {
  return new OsomApiServerSideClient(options);
}

export async function requestOsomApi<T = EmptyResponse>(
  // eslint-disable-next-line no-unused-vars
  callback: (osomApi: OsomApiServerSideClient) => Promise<T>,
  options?: ApiClientOptions & {prefix?: string}
) {
  const prefix = options?.prefix ?? '';
  try {
    const osomApi = createOsomApiServerSideClient(options);
    const result = await callback(osomApi);
    if (prefix) {
      console.info(`${prefix} OK`, result);
    }
    return ok<T>(result);
  } catch (e) {
    if (e instanceof HttpStatusError) {
      console.error(`${prefix} error`, {status: e.statusCode, error: e.error});
      return json(e.error, e.statusCode);
    } else {
      console.error(`${prefix} unknown error`, {error: String(e)});
      return internalServerError(String(e));
    }
  }
}
