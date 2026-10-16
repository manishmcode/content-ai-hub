// Change this value when the backend is deployed to a different environment.
// The Express router is mounted at `/content-aihub-api`; it does not include an
// additional `/api` path segment.
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
  || (window.location.hostname === 'localhost'
    ? 'http://localhost:4000/content-aihub-api'
    : 'https://contentaihub.net/content-aihub-api');

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/auth/login`,
  signup: `${API_BASE_URL}/auth/signup`,
  changePassword: `${API_BASE_URL}/auth/change-password`,
  dashboard: `${API_BASE_URL}/user/dashboard`,
  profile: `${API_BASE_URL}/user/profile`,
  unsubscribe: `${API_BASE_URL}/subscriptions/unsubscribe`,
  plans: `${API_BASE_URL}/plans`,
  library: `${API_BASE_URL}/library`,
  classes: `${API_BASE_URL}/classes`,
  createPaymentSession: `${API_BASE_URL}/subscriptions/create-payment-session`,
} as const;
