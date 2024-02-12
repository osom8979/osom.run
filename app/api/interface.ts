export interface EmptyResponse {
  // EMPTY.
}

export interface LoginOAuthResponse {
  url?: string;
}

export interface HealthResponse {
  mq: boolean;
}

export interface InsertProgress {
  id: string;
}

export interface SelectProgress {
  value: number;
  expired_at: string;
  created_at: string;
  updated_at: string;
}

export interface IncreaseProgress {
  value: number;
}
