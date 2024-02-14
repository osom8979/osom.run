export interface EmptyResponse {
  // EMPTY.
}

export interface LoginOAuthResponse {
  url?: string;
}

export interface ProgressId {
  id: string;
}

export interface ProgressRow {
  value: number;
  expired_at: string;
  created_at: string;
  updated_at: string;
}

export interface ProgressValue {
  value: number;
}
