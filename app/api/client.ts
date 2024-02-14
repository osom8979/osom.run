'use client';

import {StatusCodes} from 'http-status-codes';
import type {
  EmptyResponse,
  LoginOAuthResponse,
  ProgressId,
  ProgressRow,
  ProgressValue,
} from '@/app/api/interface';
import {apiPaths} from '@/app/api/path';
import {HttpStatusError, NoUrlError} from '@/app/exceptions';
import {FALLBACK_LANGUAGE} from '@/app/libs/i18n/settings';
import type {Appearance, Profile} from '@/app/libs/supabase/metadata';

export const DEFAULT_API_TIMEOUT_MILLISECONDS = 8_000;
export const DEFAULT_SUCCESS_STATES = [
  StatusCodes.OK,
  StatusCodes.CREATED,
  StatusCodes.NO_CONTENT,
];

export interface ApiClientOptions {
  lng?: string;
  timeout?: number;
  successStates?: Array<number>;
}

type FetchParameters = Parameters<typeof fetch>;
type RequestInput = FetchParameters[0];
type RequestOptions = FetchParameters[1];
type RequestOptionsWithoutMethod = Omit<RequestOptions, 'method'>;

export class ApiClient {
  lng: string;
  defaultTimeout: number;
  successStates: Array<number>;

  constructor(options?: ApiClientOptions) {
    this.lng = options?.lng ?? FALLBACK_LANGUAGE;
    this.defaultTimeout = options?.timeout ?? DEFAULT_API_TIMEOUT_MILLISECONDS;
    this.successStates = options?.successStates ?? DEFAULT_SUCCESS_STATES;
  }

  async request<T = any>(input: RequestInput, init?: RequestOptions) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.defaultTimeout);
    const signal = controller.signal;

    try {
      const response = await fetch(input, {signal, ...init});
      if (!this.successStates.includes(response.status)) {
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

  async put<T = any>(input: RequestInput, init?: RequestOptionsWithoutMethod) {
    return await this.request<T>(input, {method: 'PUT', ...init});
  }

  async delete<T = any>(input: RequestInput, init?: RequestOptionsWithoutMethod) {
    return await this.request<T>(input, {method: 'DELETE', ...init});
  }

  async login(email: string, password: string) {
    const body = new FormData();
    body.set('email', email);
    body.set('password', password);
    return await this.post<EmptyResponse>(apiPaths.authLogin, {body});
  }

  async loginOAuth(provider: string) {
    const body = new FormData();
    body.set('provider', provider);
    const {url} = await this.post<LoginOAuthResponse>(apiPaths.authLoginOAuth, {body});
    if (!url) {
      throw new NoUrlError();
    }
    return {url} as Required<LoginOAuthResponse>;
  }

  async logout() {
    return await this.post<EmptyResponse>(apiPaths.authLogout);
  }

  async signup(email: string, password: string) {
    const body = new FormData();
    body.set('email', email);
    body.set('password', password);
    return await this.post<EmptyResponse>(apiPaths.authSignup, {body});
  }

  async passwordResetRequest(email: string) {
    const body = new FormData();
    body.set('email', email);
    return await this.post<EmptyResponse>(apiPaths.authPasswordResetRequest, {body});
  }

  async passwordResetUpdate(code: string, password: string) {
    const body = new FormData();
    body.set('code', code);
    body.set('password', password);
    return await this.post<EmptyResponse>(apiPaths.authPasswordResetUpdate, {body});
  }

  async updateProfile(profile: Profile) {
    const body = new FormData();
    body.set('nickname', profile.nickname);
    body.set('timezone', profile.timezone);
    body.set('lng', profile.lng);
    return await this.post<EmptyResponse>(apiPaths.authUserProfile, {body});
  }

  async updateAppearance(appearance: Appearance) {
    const body = new FormData();
    body.set('theme', appearance.theme);
    return await this.post<EmptyResponse>(apiPaths.authUserAppearance, {body});
  }

  async createAnonymousProgress() {
    return await this.put<ProgressId>(apiPaths.anonymousProgress);
  }

  async readAnonymousProgress(code: string) {
    return await this.get<ProgressRow>(apiPaths.anonymousProgressCode(code));
  }

  async increaseAnonymousProgress(code: string) {
    return await this.post<ProgressValue>(apiPaths.anonymousProgressCode(code));
  }
}

export const apiClient = new ApiClient();
export default apiClient;
