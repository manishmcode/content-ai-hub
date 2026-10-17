import { clearSession } from './session';

test('logout clears local storage, session storage, and the asset authentication cookie', () => {
  localStorage.setItem('contentaihub_token', 'expired-token');
  localStorage.setItem('contentaihub_user', '{}');
  localStorage.setItem('cached_data', 'private');
  sessionStorage.setItem('contentaihub_checkout_plan_id', '2');
  document.cookie = 'bgp_auth_token=expired-token; Path=/';

  clearSession();

  expect(localStorage.length).toBe(0);
  expect(sessionStorage.length).toBe(0);
  expect(document.cookie).not.toContain('bgp_auth_token=');
});
