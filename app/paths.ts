export type ReasonType = null | 'error' | 'nocode' | 'rejected';

export const appPaths = {
  login: '/login',
  loginPkceError: '/login/pkce/error',
  loginPkceErrorWithReason: (reason?: ReasonType) => {
    return appPaths.loginPkceError + (reason ? `?reason=${reason}` : '');
  },
  notification: '/notification',
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
