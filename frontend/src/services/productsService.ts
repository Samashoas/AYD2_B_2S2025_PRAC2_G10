import API_CONFIG, { handleApiError } from './api';
import type { Product } from '../types/product';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_CONFIG.products}/products`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudieron cargar los productos`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await fetch(`${API_CONFIG.products}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: Producto no encontrado`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};