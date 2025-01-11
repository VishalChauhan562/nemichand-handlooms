import React from "react";
import { Pencil, Trash } from "lucide-react";
import { ProductItem } from "../../../../store/types";

interface ProductTableProps {
  products: ProductItem[];
  onEdit: (product: ProductItem) => void;
  onDelete: (id: number) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
}) => (
  <div className="admin-products__table">
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>
              <div className="product-cell">
                <img src={product.image_url} alt={product.name} />
                <span>{product.name}</span>
              </div>
            </td>
            <td>{product?.category?.name}</td>
            <td>₹{product.price}</td>
            <td>
              <span
                className={`stock-badge ${
                  product.stock < 10 ? "low" : "in-stock"
                }`}
              >
                {product.stock}
              </span>
            </td>
            <td>
              <div className="action-buttons">
                <button className="edit-btn" onClick={() => onEdit(product)}>
                  <Pencil size={16} />
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(product.id)}
                >
                  <Trash size={16} />
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
