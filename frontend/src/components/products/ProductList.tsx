import { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { Loading } from '../common/Loading';
import { ErrorMessage } from '../common/ErrorMessage';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';
import type { Product } from '../../types/product';
import './ProductList.css';

export const ProductList = () => {
  const { products, loading: loadingProducts, error: errorProducts, reload: reloadProducts } = useProducts();
  const { categories, loading: loadingCategories, error: errorCategories, reload: reloadCategories } = useCategories();
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchTerm, products]);

  const filterProducts = () => {
    let filtered = [...products];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (product) => product.category_id === parseInt(selectedCategory)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const getCategoryName = (categoryId: number): string => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Sin categoría';
  };

  const handleRetry = () => {
    reloadProducts();
    reloadCategories();
  };

  if (loadingProducts || loadingCategories) {
    return <Loading />;
  }

  if (errorProducts || errorCategories) {
    return (
      <ErrorMessage
        message={errorProducts || errorCategories || 'Error al cargar datos'}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="product-list-container">
      <div className="content-header">
        <h2>Menú del Restaurante</h2>
        <p>Explora nuestros deliciosos platillos</p>
      </div>

      <ProductFilters
        categories={categories}
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        onCategoryChange={setSelectedCategory}
        onSearchChange={setSearchTerm}
      />

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <p>No se encontraron productos</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categoryName={getCategoryName(product.category_id)}
            />
          ))
        )}
      </div>

      <footer className="footer">
        <p>
          Mostrando {filteredProducts.length} de {products.length} productos
        </p>
      </footer>
    </div>
  );
};