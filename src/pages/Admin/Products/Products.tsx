// src/pages/Admin/Products/Products.tsx
import { useState } from 'react';
import { Plus, Search, Pencil, Trash, Filter } from 'lucide-react';
import './Products.scss';
import React from 'react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

const AdminProducts = () => {
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Premium Cotton Bedsheet',
      category: 'Bedsheets',
      price: 2499,
      stock: 25,
      image: 'https://dummyimage.com/100x100/000/fff'
    },
    {
      id: '2',
      name: 'Traditional Doormat',
      category: 'Doormats',
      price: 899,
      stock: 30,
      image: 'https://dummyimage.com/100x100/000/fff'
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="admin-products">
      <div className="admin-products__header">
        <h1>Products</h1>
        <button className="add-product-btn" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <div className="admin-products__toolbar">
        <div className="search-box">
          <Search size={20} />
          <input type="text" placeholder="Search products..." />
        </div>

        <div className="filter-box">
          <Filter size={20} />
          <select>
            <option value="">All Categories</option>
            <option value="bedsheets">Bedsheets</option>
            <option value="doormats">Doormats</option>
            <option value="floormats">Floormats</option>
          </select>
        </div>
      </div>

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
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  <div className="product-cell">
                    <img src={product.image} alt={product.name} />
                    <span>{product.name}</span>
                  </div>
                </td>
                <td>{product.category}</td>
                <td>₹{product.price}</td>
                <td>
                  <span className={`stock-badge ${
                    product.stock < 10 ? 'low' : 'in-stock'
                  }`}>
                    {product.stock}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn">
                      <Pencil size={16} />
                      Edit
                    </button>
                    <button className="delete-btn">
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

      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Product</h2>
            <form className="product-form">
              <div className="form-group">
                <label>Product Name</label>
                <input type="text" required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select required>
                    <option value="">Select Category</option>
                    <option value="bedsheets">Bedsheets</option>
                    <option value="doormats">Doormats</option>
                    <option value="floormats">Floormats</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Price</label>
                  <input type="number" required />
                </div>
              </div>

              <div className="form-group">
                <label>Stock</label>
                <input type="number" required />
              </div>

              <div className="form-group">
                <label>Product Image</label>
                <input type="file" accept="image/*" required />
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;