/** @jest-environment node */
import { fetchWithSession } from './session';

const originalFetch = global.fetch;
const originalHeaders = global.Headers;
const fetchMock = jest.fn();

// This Jest version does not expose the browser Headers API.
beforeAll(() => {
  global.Headers = class {
    private values: Record<string, string>;
    constructor(values: Record<string, string> = {}) { this.values = { ...values }; }
    set(name: string, value: string) { this.values[name.toLowerCase()] = value; }
    get(name: string) { return this.values[name.toLowerCase()] ?? null; }
  } as unknown as typeof Headers;
});

beforeEach(() => {
  global.fetch = fetchMock;
  fetchMock.mockReset();
});

afterAll(() => {
  global.fetch = originalFetch;
  global.Headers = originalHeaders;
});

test('invalid or expired authenticated sessions trigger cleanup before rejecting', async () => {
  fetchMock.mockResolvedValue({ status: 401 });
  const clearAndRedirect = jest.fn();
  await expect(fetchWithSession('/dashboard', {}, 'expired-token', clearAndRedirect))
    .rejects.toThrow('Please sign in again.');
  expect(clearAndRedirect).toHaveBeenCalledTimes(1);
  expect(fetchMock.mock.calls[0][1].headers.get('Authorization')).toBe('Bearer expired-token');
});

test.each([200, 403, 500])('status %s does not invalidate the session', async (status) => {
  const response = { status };
  fetchMock.mockResolvedValue(response);
  const clearAndRedirect = jest.fn();
  expect(await fetchWithSession('/library', {}, 'valid-token', clearAndRedirect)).toBe(response);
  expect(clearAndRedirect).not.toHaveBeenCalled();
});

test('an unauthenticated 401 does not trigger a session redirect', async () => {
  fetchMock.mockResolvedValue({ status: 401 });
  const clearAndRedirect = jest.fn();
  await fetchWithSession('/checkout', {}, null, clearAndRedirect);
  expect(clearAndRedirect).not.toHaveBeenCalled();
});

test('network failures do not invalidate the session', async () => {
  fetchMock.mockRejectedValue(new Error('Network error'));
  const clearAndRedirect = jest.fn();
  await expect(fetchWithSession('/dashboard', {}, 'valid-token', clearAndRedirect)).rejects.toThrow('Network error');
  expect(clearAndRedirect).not.toHaveBeenCalled();
});
