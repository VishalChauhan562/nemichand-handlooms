import React from "react";
import { useAppSelector } from "../../store/hooks";
import Loader from "../../components/Loader/Loader";
import { ProductCard } from "./ProductCard";

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
