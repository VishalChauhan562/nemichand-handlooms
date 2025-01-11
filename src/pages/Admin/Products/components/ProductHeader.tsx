import React from "react";
import { Plus } from "lucide-react";

interface ProductHeaderProps {
  onAddClick: () => void;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({ onAddClick }) => (
  <div className="admin-products__header">
    <h1>Products</h1>
    <button className="add-product-btn" onClick={onAddClick}>
      <Plus size={20} />
      Add Product
    </button>
  </div>
);
