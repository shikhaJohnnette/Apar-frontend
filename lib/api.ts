const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, '') ?? '';
const authSessionChangedEvent = 'auth-session-changed';

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export function saveAuthTokens(token: string, refreshToken: string) {
  sessionStorage.setItem('accessToken', token);
  sessionStorage.setItem('refreshToken', refreshToken);
}

export function clearAuthTokens() {
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
  sessionStorage.removeItem('userName');
  sessionStorage.removeItem('userRole');
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(authSessionChangedEvent));
}

export function saveAuthUser(name: string, role: string) {
  sessionStorage.setItem('userName', name);
  sessionStorage.setItem('userRole', role);
  window.dispatchEvent(new Event(authSessionChangedEvent));
}

export function subscribeToAuthSession(onChange: () => void) {
  window.addEventListener(authSessionChangedEvent, onChange);
  return () => window.removeEventListener(authSessionChangedEvent, onChange);
}

export function getStoredUserName() {
  return sessionStorage.getItem('userName') ?? '';
}

export function getStoredUserRole() {
  return sessionStorage.getItem('userRole') ?? '';
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (!(init.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const isPublicAuthRequest = path === '/api/v1/login' || path === '/api/v1/register';
  if (typeof window !== 'undefined' && !isPublicAuthRequest && !headers.has('Authorization')) {
    const token = sessionStorage.getItem('accessToken');
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers,
  });

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload !== null && 'message' in payload && typeof payload.message === 'string'
        ? payload.message
        : `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status);
  }

  return payload as T;
}

export async function apiFileRequest(path: string): Promise<Blob> {
  const headers = new Headers();
  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem('accessToken');
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${baseUrl}${path}`, { headers });
  if (!response.ok) {
    const payload: unknown = await response.json().catch(() => null);
    const message =
      typeof payload === 'object' && payload !== null && 'message' in payload && typeof payload.message === 'string'
        ? payload.message
        : `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status);
  }

  return response.blob();
}