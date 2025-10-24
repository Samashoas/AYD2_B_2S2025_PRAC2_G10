import type { Category } from '../../types/category';
import './ProductFilters.css';

interface ProductFiltersProps {
  categories: Category[];
  selectedCategory: string;
  searchTerm: string;
  onCategoryChange: (categoryId: string) => void;
  onSearchChange: (term: string) => void;
}

export const ProductFilters = ({
  categories,
  selectedCategory,
  searchTerm,
  onCategoryChange,
  onSearchChange,
}: ProductFiltersProps) => {
  return (
    <div className="filters-container">
      <div className="filter-group">
        <label htmlFor="category-filter">Filtrar por categoría:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="filter-select"
        >
          <option value="all">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="search-input">Buscar producto:</label>
        <input
          id="search-input"
          type="text"
          placeholder="Ej: Pizza, Hamburguesa..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
};