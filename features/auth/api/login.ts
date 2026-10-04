import { apiRequest } from '@/lib/api';
import type { UserDto } from './register';

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  refreshToken: string;
  user: UserDto;
};

export function loginUser(credentials: LoginRequest) {
  return apiRequest<LoginResponse>('/api/v1/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}