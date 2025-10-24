import { useState, useEffect } from 'react';
import type { Product } from '../../types/product';
import type { Category } from '../../types/category';
import API_CONFIG from '../../services/api';
import './ProductForm.css';

interface ProductFormProps {
  product: Product | null;
  categories: Category[];
  onClose: () => void;
  onSuccess: () => void;
}

export const ProductForm = ({ product, categories, onClose, onSuccess }: ProductFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description || '');
      setPrice(product.price.toString());
      setCategoryId(product.category_id.toString());
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validaciones
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('El precio debe ser un número mayor a 0');
      setLoading(false);
      return;
    }

    if (!categoryId) {
      setError('Debes seleccionar una categoría');
      setLoading(false);
      return;
    }

    try {
      const url = product
        ? `${API_CONFIG.products}/products/${product.id}`
        : `${API_CONFIG.products}/products`;
      
      const method = product ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          price: priceNum,
          category_id: parseInt(categoryId),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar el producto');
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
      <div className="form-modal product-form-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>

        <div className="form-header">
          <h3>{product ? 'Editar Producto' : 'Nuevo Producto'}</h3>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Nombre del Producto *</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Pizza Margarita"
                required
                maxLength={255}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Precio (Q) *</label>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Categoría *</label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="category-select"
            >
              <option value="">-- Selecciona una categoría --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción del producto..."
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