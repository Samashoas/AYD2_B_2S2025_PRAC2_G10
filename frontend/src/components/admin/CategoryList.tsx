import { useState } from 'react';
import type { Category } from '../../types/category';
import API_CONFIG from '../../services/api';
import './CategoryList.css';

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: () => void;
}

export const CategoryList = ({ categories, onEdit, onDelete }: CategoryListProps) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (category: Category) => {
    if (!window.confirm(`¿Estás seguro de eliminar la categoría "${category.name}"?`)) {
      return;
    }

    setDeletingId(category.id);

    try {
      const response = await fetch(
        `${API_CONFIG.categories}/categories/${category.id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Error al eliminar la categoría');
      }

      onDelete();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error al eliminar');
    } finally {
      setDeletingId(null);
    }
  };

  if (categories.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay categorías registradas</p>
        <p className="empty-subtitle">Comienza agregando una nueva categoría</p>
      </div>
    );
  }

  return (
    <div className="category-list">
      <div className="list-header">
        <span className="header-name">Nombre</span>
        <span className="header-description">Descripción</span>
        <span className="header-actions">Acciones</span>
      </div>

      {categories.map((category) => (
        <div key={category.id} className="category-item">
          <div className="item-name">
            <strong>{category.name}</strong>
          </div>
          <div className="item-description">
            {category.description || 'Sin descripción'}
          </div>
          <div className="item-actions">
            <button
              className="btn-edit"
              onClick={() => onEdit(category)}
              disabled={deletingId === category.id}
              title="Editar"
            >
              ✏️
            </button>
            <button
              className="btn-delete"
              onClick={() => handleDelete(category)}
              disabled={deletingId === category.id}
              title="Eliminar"
            >
              {deletingId === category.id ? '⏳' : '🗑️'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};