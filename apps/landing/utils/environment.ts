export const ENVIRONMENT = {
  CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL || 'https://getjetstream.app/app',
  SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || 'https://getjetstream.app',
  CAPTCHA_KEY: process.env.NEXT_PUBLIC_CAPTCHA_KEY || null,
};

export const AUTH_PATHS = {
  _root_path: '/auth/',
  login: '/auth/login/',
  signup: '/auth/signup/',
  resetPassword: '/auth/password-reset',
  resetPasswordVerify: '/auth/password-reset/verify',
  verify: `/auth/verify`,
  api_csrf: `/api/auth/csrf`,
  api_logout: `/api/auth/logout`,
  api_providers: `/api/auth/providers`,
  api_session: `/api/auth/session`,
  api_verify: `/api/auth/verify`,
  api_verify_resend: `/api/auth/verify/resend`,
  api_reset_password_init: `/api/auth/password/reset/init`,
  api_reset_password_verify: `/api/auth/password/reset/verify`,
};

export const SIGN_IN_ERRORS = {
  default: 'Check your details and try again.',
  AuthError: 'Check your details and try again.',
  InvalidCsrfToken: 'The form is invalid, refresh the page and start over.',
  InvalidCredentials: 'Sign in failed. Check the details you provided are correct.',
  InvalidAction: 'The form is invalid, refresh the page and start over.',
  InvalidParameters: 'The form is invalid, refresh the page and start over.',
  InvalidProvider: 'The form is invalid, refresh the page and start over.',
  InvalidSession: 'Your session is invalid, please sign in again.',
  InvalidCaptcha: 'Invalid captcha verification, refresh and try again to confirm you are not a bot.',
  ExpiredVerificationToken: 'Your verification token has expired, sign in again.',
  InvalidVerificationToken: 'Your verification token is invalid.',
  LoginWithExistingIdentity: 'To confirm your identity, sign in with the same account you used originally.',
  InvalidRegistration: 'This email is already registered. If you already have an account, please log in or reset your password.',
  InvalidOrExpiredResetToken: 'Your reset token is invalid, please restart the reset process.',
};