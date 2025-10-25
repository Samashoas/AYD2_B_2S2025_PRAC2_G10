import type { User, LoginCredentials } from '../types/auth';

const ADMIN_EMAIL = 'admin@restaurante.com';
const ADMIN_PASSWORD = 'admin123';
const AUTH_KEY = 'restaurant_auth';

export const login = (credentials: LoginCredentials): User | null => {
  if (
    credentials.email === ADMIN_EMAIL &&
    credentials.password === ADMIN_PASSWORD
  ) {
    const user: User = {
      email: ADMIN_EMAIL,
      role: 'admin',
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_KEY);
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(AUTH_KEY);
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};