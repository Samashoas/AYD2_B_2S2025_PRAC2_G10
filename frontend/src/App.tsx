import { useState } from 'react';
import { Header } from './components/common/Header';
import { ProductList } from './components/products/ProductList';
import { Login } from './components/auth/Login';
import { AdminPanel } from './components/admin/AdminPanel';
import { useAuth } from './hooks/useAuth';
import type { User } from './types/auth';

function App() {
  const { user: initialUser, loading } = useAuth();
  const [user, setUser] = useState<User | null>(initialUser);
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleLoginSuccess = (loggedUser: User) => {
    setUser(loggedUser);
    setShowLogin(false);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        color: 'white'
      }}>
        Cargando...
      </div>
    );
  }

  // Si el usuario está autenticado, mostrar panel de admin
  if (user) {
    return <AdminPanel user={user} onLogout={handleLogout} />;
  }

  // Si no está autenticado, mostrar la vista pública
  return (
    <div className="app-container">
      <Header onLoginClick={handleLoginClick} />
      <ProductList />
      {showLogin && (
        <Login onLoginSuccess={handleLoginSuccess} onClose={handleCloseLogin} />
      )}
    </div>
  );
}

export default App;