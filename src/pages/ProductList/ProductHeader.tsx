import React from "react";
import { Grid2X2, Grid3X3 } from "lucide-react";
import { ProductToolbar } from "../../components/Tools/ProductToolbar";




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
