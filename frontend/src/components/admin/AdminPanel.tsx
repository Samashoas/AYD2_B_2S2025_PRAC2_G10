import { useState } from 'react';
import type { User } from '../../types/auth';
import { logout } from '../../services/authService';
import { CategoriesManager } from './CategoriesManager';
import { ProductsManager } from './ProductsManager';
import './AdminPanel.css';

interface AdminPanelProps {
  user: User;
  onLogout: () => void;
}

type TabType = 'categories' | 'products';

export const AdminPanel = ({ user, onLogout }: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('categories');

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <div className="admin-header-content">
          <div className="admin-title">
            <h1>Panel de Administración</h1>
            <p className="admin-user">👤 {user.email}</p>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="admin-container">
        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            Categorías
          </button>
          <button
            className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Productos
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'categories' && <CategoriesManager />}
          {activeTab === 'products' && <ProductsManager />}
        </div>
      </div>
    </div>
  );
};