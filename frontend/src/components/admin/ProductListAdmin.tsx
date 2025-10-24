import { useState } from 'react';
import type { Product } from '../../types/product';
import type { Category } from '../../types/category';
import API_CONFIG from '../../services/api';
import './ProductListAdmin.css';

interface ProductListAdminProps {
  products: Product[];
  categories: Category[];
  onEdit: (product: Product) => void;
  onDelete: () => void;
}

export const ProductListAdmin = ({ products, categories, onEdit, onDelete }: ProductListAdminProps) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const getCategoryName = (categoryId: number): string => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Sin categoría';
  };

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`¿Estás seguro de eliminar "${product.name}"?`)) {
      return;
    }

    setDeletingId(product.id);

    try {
      const response = await fetch(
        `${API_CONFIG.products}/products/${product.id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      onDelete();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error al eliminar');
    } finally {
      setDeletingId(null);
    }
  };

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay productos registrados</p>
        <p className="empty-subtitle">Comienza agregando un nuevo producto</p>
      </div>
    );
  }

  return (
    <div className="product-list-admin">
      <div className="list-header">
        <span className="header-name">Producto</span>
        <span className="header-category">Categoría</span>
        <span className="header-description">Descripción</span>
        <span className="header-price">Precio</span>
        <span className="header-actions">Acciones</span>
      </div>

      {products.map((product) => (
        <div key={product.id} className="product-item-admin">
          <div className="item-name">
            <span className="product-icon"></span>
            <strong>{product.name}</strong>
          </div>
          <div className="item-category">
            <span className="category-badge-admin">
              {getCategoryName(product.category_id)}
            </span>
          </div>
          <div className="item-description">
            {product.description || 'Sin descripción'}
          </div>
          <div className="item-price">
            <strong>Q{product.price.toFixed(2)}</strong>
          </div>
          <div className="item-actions">
            <button
              className="btn-edit"
              onClick={() => onEdit(product)}
              disabled={deletingId === product.id}
              title="Editar"
            >
              ✏️
            </button>
            <button
              className="btn-delete"
              onClick={() => handleDelete(product)}
              disabled={deletingId === product.id}
              title="Eliminar"
            >
              {deletingId === product.id ? '⏳' : '🗑️'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};