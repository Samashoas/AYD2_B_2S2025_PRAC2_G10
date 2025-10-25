import { useState, useEffect } from 'react';
import type { Category } from '../../types/category';
import API_CONFIG from '../../services/api';
import './CategoryForm.css';

interface CategoryFormProps {
  category: Category | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const CategoryForm = ({ category, onClose, onSuccess }: CategoryFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description || '');
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const url = category
        ? `${API_CONFIG.categories}/categories/${category.id}`
        : `${API_CONFIG.categories}/categories`;
      
      const method = category ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar la categoría');
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-overlay" onClick={onClose}>
      <div className="form-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>

        <div className="form-header">
          <h3>{category ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
        </div>

        <form onSubmit={handleSubmit} className="category-form">
          <div className="form-group">
            <label htmlFor="name">Nombre *</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Entradas, Platos Fuertes..."
              required
              maxLength={255}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción de la categoría..."
              rows={4}
            />
          </div>

          {error && <div className="error-alert">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};