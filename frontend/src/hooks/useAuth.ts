import { useState, useEffect } from 'react';
import type { User } from '../types/auth';
import { getCurrentUser } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  return { user, loading, setUser };
};