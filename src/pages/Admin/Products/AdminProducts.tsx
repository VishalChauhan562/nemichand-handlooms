import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../../store/slices/productSlice";
import { ProductHeader } from "./components/ProductHeader";
import { ProductToolbar } from "../../../components/Tools/ProductToolbar";
import { ProductTable } from "./components/ProductTable";
import { ProductForm } from "./components/ProductForm";
import { ProductItem } from "../../../store/types";
import "./AdminProducts.scss";
import Pagination from "../../../components/Pagination";
import { useSearchParams } from "react-router-dom";

const AdminProducts: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    products,
    loading,
    addProductLoading,
    updateProductLoading,
    deleteProductLoading,
    total,
  } = useAppSelector((state) => state.product);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(
    null
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState({
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 10,
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
  });

  const getQueryString = (): string => {
    const params = new URLSearchParams({
      page: queryParams.page.toString(),
      limit: queryParams.limit.toString(),
      ...(queryParams.search && { search: queryParams.search }),
      ...(queryParams.category && { category: queryParams.category }),
    });

    return params.toString();
  };

  const getFilteredProducts = () => {
    const query_s = getQueryString();
    dispatch(fetchProducts(query_s));
  };

  useEffect(() => {
    const params = new URLSearchParams();

    if (queryParams.page > 1) params.set("page", queryParams.page.toString());
    if (queryParams.limit !== 10)
      params.set("limit", queryParams.limit.toString());
    if (queryParams.search) params.set("search", queryParams.search);
    if (queryParams.category) params.set("category", queryParams.category);

    setSearchParams(params);
  }, [queryParams, setSearchParams]);

  useEffect(() => {
    getFilteredProducts();
  }, [dispatch, queryParams]);

  const handleSearch = (query: string) => {
    setQueryParams((prev) => ({ ...prev, search: query, page: 1 }));
  };

  const handleCategoryFilter = (category: string) => {
    setQueryParams((prev) => ({ ...prev, category, page: 1 }));
  };

  const handleAddProduct = async (formData: any) => {
    try {
      // Convert string values to appropriate types
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category_id: Number(formData.category_id),
      };

      await dispatch(addProduct(productData));
      setIsModalOpen(false);
      getFilteredProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleUpdateProduct = async (formData: any) => {
    if (selectedProduct) {
      try {
        // Convert string values to appropriate types
        const productData = {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
          category_id: Number(formData.category_id),
        };

        await dispatch(
          updateProduct({
            id: selectedProduct.id,
            data: productData,
          })
        );
        setIsModalOpen(false);
        setSelectedProduct(null);
        getFilteredProducts();
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(deleteProduct(id));
        getFilteredProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setQueryParams((prev) => ({ ...prev, page }));
  };

  return (
    <div className="admin-products">
      <ProductHeader onAddClick={() => setIsModalOpen(true)} />
      <div className="admin-products__toolbar">
        <ProductToolbar
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
          isCategoryNeeded={true}
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ProductTable
          products={products}
          onEdit={(product) => {
            setSelectedProduct(product);
            setIsModalOpen(true);
          }}
          onDelete={handleDeleteProduct}
        />
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedProduct ? "Edit Product" : "Add New Product"}</h2>
            <ProductForm
              initialData={selectedProduct || undefined}
              onSubmit={
                selectedProduct ? handleUpdateProduct : handleAddProduct
              }
              onCancel={() => {
                setIsModalOpen(false);
                setSelectedProduct(null);
              }}
              isLoading={
                selectedProduct ? updateProductLoading : addProductLoading
              }
            />
          </div>
        </div>
      )}
      <Pagination
        currentPage={queryParams.page}
        onPageChange={(page) => handlePageChange(page)}
        limit={queryParams.limit}
      />
    </div>
  );
};

export default AdminProducts;

/*
<Pagination
        currentPage={filters.page}
        totalPages={Math.ceil(total / filters.limit)}
        onPageChange={(page) => handlePageChange(page)}
      />
*/
