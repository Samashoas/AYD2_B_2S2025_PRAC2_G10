const API_CONFIG = {
  products: import.meta.env.VITE_PRODUCTS_API || 'http://127.0.0.1:5001/api',
  categories: import.meta.env.VITE_CATEGORIES_API || 'http://127.0.0.1:5002/api',
};

export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Error desconocido al conectar con el servidor';
};

export default API_CONFIG;