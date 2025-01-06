import { useEffect, useState } from "react";
import { Filter, Grid2X2, Grid3X3 } from "lucide-react";
import "./ProductList.scss";
import { useSearchParams } from "react-router-dom";
import React from "react";

interface SubFilter {
  id: string;
  name: string;
  values: string[];
}

interface Category {
  id: string;
  name: string;
  subFilters?: SubFilter[];
}

const categories: Category[] = [
  {
    id: "bedsheets",
    name: "Bedsheets",
    subFilters: [
      {
        id: "size",
        name: "Size",
        values: ["Single", "Double", "King", "Queen"],
      },
      {
        id: "fabric",
        name: "Fabric",
        values: ["Cotton", "Silk", "Linen", "Polyester"],
      },
      {
        id: "pattern",
        name: "Pattern",
        values: ["Solid", "Printed", "Striped", "Floral"],
      },
    ],
  },
  {
    id: "doormats",
    name: "Doormats",
  },
  {
    id: "floormats",
    name: "Floormats",
  },
  {
    id: "tablecovers",
    name: "Table Covers",
  },
];

const ProductList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubFilters, setSelectedSubFilters] = useState<
    Record<string, string[]>
  >({});
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [rating, setRating] = useState<number | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchParams] = useSearchParams();
  const categoryFromQuery = searchParams.get("category");

  useEffect(() => {
    if (categoryFromQuery) {
      const isValidCategory = categories.some(
        (cat) => cat.id === categoryFromQuery
      );
      if (isValidCategory) {
        setSelectedCategory(categoryFromQuery);
      }
    }
  }, [categoryFromQuery]);

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(selectedCategory === category.id ? "" : category.id);
  };

  const handleSubFilterChange = (
    categoryId: string,
    filterId: string,
    value: string
  ) => {
    setSelectedSubFilters((prev) => {
      const key = `${categoryId}_${filterId}`;
      const currentValues = prev[key] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [key]: newValues };
    });
  };

  return (
    <div className="product-list">
      <div className="product-list__header">
        <h1>All Products</h1>
        <div className="product-list__controls">
          <button className="product-list__control-btn">
            <Filter size={20} />
            Filters
          </button>
          <select className="product-list__sort">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
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

      <div className="product-list__content">
        <aside className="product-list__filters">
          <section className="filter-section">
            <h2>Categories</h2>
            {categories.map((category) => (
              <div key={category.id} className="filter-group">
                <label className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCategory === category.id}
                    onChange={handleCategoryChange}
                  />
                  {category.name}
                </label>

                {category.subFilters && selectedCategory === category.id && (
                  <div className="sub-filters">
                    {category.subFilters.map((subFilter) => (
                      <div key={subFilter.id} className="sub-filter-group">
                        <h3>{subFilter.name}</h3>
                        {subFilter.values.map((value) => (
                          <label key={value} className="filter-checkbox">
                            <input
                              type="checkbox"
                              checked={selectedSubFilters[
                                `${category.id}_${subFilter.id}`
                              ]?.includes(value)}
                              onChange={() =>
                                handleSubFilterChange(
                                  category.id,
                                  subFilter.id,
                                  value
                                )
                              }
                            />
                            {value}
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
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
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], parseInt(e.target.value)])
                }
                className="price-range"
              />
              <div className="price-values">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
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
                  checked={rating === star}
                  onChange={() => setRating(star)}
                />
                {star}+ Stars
              </label>
            ))}
          </section>
        </aside>

        <div
          className={`product-grid ${
            view === "list" ? "product-grid--list" : ""
          }`}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="product-card">
              <img src="https://dummyimage.com/400x600/000/fff" alt="Product" />
              <div className="product-info">
                <h3>Premium Cotton Bedsheet</h3>
                <div className="price">
                  <span className="current-price">₹2499</span>
                  <span className="original-price">₹2999</span>
                </div>
                <div className="rating">Rating: 4.5</div>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
