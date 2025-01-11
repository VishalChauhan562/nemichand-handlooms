import React, { useEffect, useState } from "react";
import { Grid2X2, Grid3X3 } from "lucide-react";
import { ProductToolbar } from "../../components/Tools/ProductToolbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ProductItem } from "../../store/types";
import Loader from "../../components/Loader/Loader";
import {
  addToCart,
  removeFromCart,
  selectCartItems,
  updateCartItem,
} from "../../store/slices/cartSlice";

interface ProductHeaderProps {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
  onSearch: () => void;
  onSort: (sort: string) => void;
  currentSort: string;
}

export const ProductHeader: React.FC<ProductHeaderProps> = React.memo(
  ({ view, setView, onSearch, onSort, currentSort }) => (
    <div className="product-list__header">
      <h1>All Products</h1>
      <div className="product-list__toolbar">
        <ProductToolbar onSearch={onSearch} />
      </div>
      <div className="product-list__controls">
        <select
          className="product-list__sort"
          onChange={(e) => onSort(e.target.value)}
          value={currentSort}
        >
          <option value="price_low_to_high">Price: Low to High</option>
          <option value="price_high_to_low">Price: High to Low</option>
        </select>
        <div className="product-list__view-toggle">
          <button
            className={view === "grid" ? "active" : ""}
            onClick={() => setView("grid")}
          >
            <Grid2X2 size={20} />
          </button>
          <button
            className={view === "list" ? "active" : ""}
            onClick={() => setView("list")}
          >
            <Grid3X3 size={20} />
          </button>
        </div>
      </div>
    </div>
  )
);

// components/Products/ProductFilters.tsx
interface ProductFiltersProps {
  categories: any[];
  filters: {
    category: number | null;
    minPrice: number;
    maxPrice: number;
    rating: number | null;
  };
  onCategoryChange: (id: number) => void;
  onPriceChange: (min: number, max: number) => void;
  onRatingChange: (rating: number) => void;
  onApplyFilters: () => void;
  showApplyButton: boolean;
}

export const ProductFilters: React.FC<ProductFiltersProps> = React.memo(
  ({
    categories,
    filters,
    onCategoryChange,
    onPriceChange,
    onRatingChange,
    onApplyFilters,
    showApplyButton,
  }) => (
    <aside className="product-list__filters">
      <section className="filter-section">
        <h2>Categories</h2>
        {categories.map((category) => (
          <div key={category.id} className="filter-group">
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.category === category.id}
                onChange={() => onCategoryChange(category.id)}
              />
              {category.name}
            </label>
          </div>
        ))}
      </section>

      <section className="filter-section">
        <h2>Price Range</h2>
        <div className="price-range-container">
          <input
            type="range"
            min="0"
            max="10000"
            value={filters.maxPrice}
            onChange={(e) =>
              onPriceChange(filters.minPrice, parseInt(e.target.value))
            }
            className="price-range"
          />
          <div className="price-values">
            <span>₹{filters.minPrice}</span>
            <span>₹{filters.maxPrice}</span>
          </div>
        </div>
      </section>

      <section className="filter-section">
        <h2>Rating</h2>
        {[4, 3, 2, 1].map((star) => (
          <label key={star} className="filter-radio">
            <input
              type="radio"
              name="rating"
              checked={filters.rating === star}
              onChange={() => onRatingChange(star)}
            />
            {star}+ Stars
          </label>
        ))}
      </section>
      <button
        onClick={onApplyFilters}
        className={`apply-filters ${showApplyButton ? "active" : ""}`}
      >
        Apply Filters
      </button>
    </aside>
  )
);

// components/Products/ProductCard.tsx
interface ProductCardProps {
  product: ProductItem;
  onAddToCart: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({ product, onAddToCart }) => (
    <div className="product-card">
      <img src={product.image_url} alt="Product" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="price">
          <span className="current-price">₹{product.price}</span>
          <span className="original-price">₹{product.price}</span>
        </div>
        <div className="rating">Rating: 4.5</div>
        <button className="add-to-cart" onClick={() => onAddToCart(product.id)}>
          Add to Cart
        </button>
      </div>
    </div>
  )
);

// components/Products/ProductGrid.tsx
interface ProductSectionProps {
  view: "grid" | "list";
  onAddToCart: (id: number) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = React.memo(
  ({ view, onAddToCart }) => {
    const { products, loading, error } = useAppSelector(
      (state) => state.product
    );
    if (error) return <div className="product-grid-error">{error}</div>;
    return (
      <div className="product-grid-container">
        {loading && (
          <div>
            <Loader />
          </div>
        )}

        <div
          className={`product-grid ${
            view === "list" ? "product-grid--list" : ""
          }`}
          style={{ opacity: loading ? 0.5 : 1 }}
        >
          {products.map((product, i) => (
            <ProductCard key={i} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    );
  }
);
// export interface ProductItem {
//   id: number;
//   name: string;
//   category: CategoryInProduct;
//   price: string;
//   stock: number;
//   image_url: string;
//   description : string;
//   is_active: boolean;
//   is_featured: boolean
// }
