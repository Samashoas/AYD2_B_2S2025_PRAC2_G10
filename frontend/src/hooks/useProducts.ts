import { useState, useEffect } from 'react';
import type { Product } from '../types/product';
import API_CONFIG from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_CONFIG.products}/products`);
      
      if (!response.ok) {
        throw new Error('Error al cargar los productos');
      }
      
      const data = await response.json();
      
      // Filtrar solo productos activos
      const activeProducts = data.filter((product: Product) => product.active === true);
      setProducts(activeProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const reload = () => {
    fetchProducts();
  };

  return { products, loading, error, reload };
};