import { useState, useEffect } from 'react';
import { useCategories } from '../../hooks/useCategories';
import type { Category } from '../../types/category';
import { Loading } from '../common/Loading';
import { ErrorMessage } from '../common/ErrorMessage';
import { CategoryForm } from './CategoryForm';
import { CategoryList } from './CategoryList';
import './CategoriesManager.css';

export const CategoriesManager = () => {
  const { categories, loading, error, reload } = useCategories();
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleAdd = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingCategory(null);
    reload();
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <div className="categories-manager">
      <div className="manager-header">
        <div>
          <h2>Gestión de Categorías</h2>
          <p>Administra las categorías del menú</p>
        </div>
        <button className="btn-add" onClick={handleAdd}>
          Nueva Categoría
        </button>
      </div>

      {showForm && (
        <CategoryForm
          category={editingCategory}
          onClose={handleCloseForm}
          onSuccess={handleSuccess}
        />
      )}

      <CategoryList
        categories={categories}
        onEdit={handleEdit}
        onDelete={reload}
      />
    </div>
  );
};