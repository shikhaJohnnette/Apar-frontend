import { apiRequest } from '@/lib/api';

export type UserCreateRequest = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  photoUrl?: string;
  provider: 'local';
  roleName: 'ROLE_USER';
};

export type UserDto = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  photoUrl: string | null;
  provider: string;
  enabled: boolean;
  role: {
    id: number;
    name: string;
    description: string;
  };
  createdAt: string;
  updatedAt: string;
};

export function registerUser(user: UserCreateRequest) {
  return apiRequest<UserDto>('/api/v1/register', {
    method: 'POST',
    body: JSON.stringify(user),
  });
}