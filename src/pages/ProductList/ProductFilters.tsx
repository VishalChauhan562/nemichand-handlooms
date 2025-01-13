import React from "react";

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
