import { useState } from 'react';
import { login } from '../../services/authService';
import type { User } from '../../types/auth';
import './Login.css';

interface LoginProps {
  onLoginSuccess: (user: User) => void;
  onClose: () => void;
}

export const Login = ({ onLoginSuccess, onClose }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const user = login({ email, password });
      
      if (user) {
        onLoginSuccess(user);
      } else {
        setError('Credenciales incorrectas. Intenta de nuevo.');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
        
        <div className="login-header">
          <h2>Iniciar Sesión</h2>
          <p>Panel de Administración</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@restaurante.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          {error && <div className="error-alert">{error}</div>}

          <button type="submit" className="btn-login-submit" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};