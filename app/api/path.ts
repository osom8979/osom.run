export const apiPaths = {
  anonymousProgress: '/api/anonymous/progress',
  anonymousProgressCode: (code: string) => apiPaths.anonymousProgress + `/${code}`,
  authLogin: '/api/auth/login',
  authLoginOAuth: '/api/auth/login/oauth',
  authLoginPkce: '/api/auth/login/pkce',
  authLogout: '/api/auth/logout',
  authPasswordResetRequest: '/api/auth/password/reset/request',
  authPasswordResetUpdate: '/api/auth/password/reset/update',
  authSignup: '/api/auth/signup',
  authUserAppearance: '/api/auth/user/appearance',
  authUserProfile: '/api/auth/user/profile',
};

export default apiPaths;
