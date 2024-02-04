export type ReasonType = null | 'error' | 'nocode' | 'rejected';

export const appPaths = {
  login: '/login',
  loginPkceError: '/login/pkce/error',
  loginPkceErrorWithReason: (reason?: ReasonType) => {
    return appPaths.loginPkceError + (reason ? `?reason=${reason}` : '');
  },
  passwordResetRequest: '/password/reset/request',
  passwordResetRequestWait: '/password/reset/request/wait',
  passwordResetUpdate: '/password/reset/update',
  progress: '/progress',
  progressCode: (code: string) => appPaths.progress + `/${code}`,
  settings: '/settings',
  settingsAppearance: '/settings/appearance',
  settingsConnection: '/settings/connection',
  settingsProfile: '/settings/profile',
  signup: '/signup',
  signupWait: '/signup/wait',
};

export const apiPaths = {
  login: '/api/auth/login',
  loginOAuth: '/api/auth/login/oauth',
  loginPkce: '/api/auth/login/pkce',
  logout: '/api/auth/logout',
  passwordResetRequest: '/api/auth/password/reset/request',
  passwordResetUpdate: '/api/auth/password/reset/update',
  signup: '/api/auth/signup',
  userProfile: '/api/auth/user/profile',
  userAppearance: '/api/auth/user/appearance',
  progress: '/api/progress',
};
