export const clearSession = () => {
  localStorage.clear();
  sessionStorage.clear();
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `bgp_auth_token=; Path=/; SameSite=Lax${secure}; Max-Age=0`;
};

export const fetchWithSession = async (
  url: string,
  options: RequestInit,
  token: string | null,
  onUnauthorized: () => void,
) => {
  const headers = new Headers(options.headers);
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const response = await fetch(url, { ...options, headers });
  if (token && response.status === 401) {
    onUnauthorized();
    throw new Error('Your session has expired or is invalid. Please sign in again.');
  }
  return response;
};
