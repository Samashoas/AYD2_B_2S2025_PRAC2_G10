import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import type { Product } from '../../types/product';
import { Loading } from '../common/Loading';
import { ErrorMessage } from '../common/ErrorMessage';
import { ProductForm } from './ProductForm';
import { ProductListAdmin } from './ProductListAdmin';
import './ProductsManager.css';

export const ProductsManager = () => {
  const { products, loading: loadingProducts, error: errorProducts, reload: reloadProducts } = useProducts();
  const { categories, loading: loadingCategories, error: errorCategories } = useCategories();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingProduct(null);
    reloadProducts();
  };

  if (loadingProducts || loadingCategories) return <Loading />;
  if (errorProducts || errorCategories) {
    return <ErrorMessage message={errorProducts || errorCategories || 'Error'} onRetry={reloadProducts} />;
  }

  return (
    <div className="products-manager">
      <div className="manager-header">
        <div>
          <h2>Gestión de Productos</h2>
          <p>Administra el menú del restaurante</p>
        </div>
        <button className="btn-add" onClick={handleAdd}>
          Nuevo Producto
        </button>
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          categories={categories}
          onClose={handleCloseForm}
          onSuccess={handleSuccess}
        />
      )}

      <ProductListAdmin
        products={products}
        categories={categories}
        onEdit={handleEdit}
        onDelete={reloadProducts}
      />
    </div>
  );
};