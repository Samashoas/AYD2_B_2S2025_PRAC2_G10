import type { Product } from '../../types/product';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  categoryName: string;
}

export const ProductCard = ({ product, categoryName }: ProductCardProps) => {
  return (
    <div className="product-card">
      <div className="product-header">
        <h3>{product.name}</h3>
        <span className="category-badge">{categoryName}</span>
      </div>
      <p className="product-description">{product.description}</p>
      <div className="product-footer">
        <span className="product-price">Q{product.price.toFixed(2)}</span>
      </div>
    </div>
  );
};