import API_CONFIG, { handleApiError } from './api';
import type { Category } from '../types/category';

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_CONFIG.categories}/categories`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudieron cargar las categorías`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};