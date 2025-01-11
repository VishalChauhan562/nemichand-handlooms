// src/store/slices/productSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../apiClient";
import {
  ModofyProductState,
  ProductItem,
  ProductResponse,
  ProductState,
} from "../types";

const initialState: ModofyProductState = {
  products: [],
  total: null,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
  addProductLoading: false,
  updateProductLoading: false,
  deleteProductLoading: false,
  addProductError: null,
  updateProductError: null,
  deleteProductError: null,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (queryParams: string = "", { rejectWithValue }) => {
    try {
      // Change the type here to match ProductItem[]
      const response = await apiClient.get<ProductResponse>(
        `/products?${queryParams}`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (productData: Partial<ProductItem>, { rejectWithValue }) => {
    try {
      const response = await apiClient.post<ProductItem>(
        "/admin/products",
        productData
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update Product Thunk
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (
    { id, data }: { id: number; data: Partial<ProductItem> },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.put<ProductItem>(
        `/admin/products/${id}`,
        data
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete Product Thunk
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: number, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/admin/products/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Existing fetchProducts cases...
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add Product cases
      .addCase(addProduct.pending, (state) => {
        state.addProductLoading = true;
        state.addProductError = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.addProductLoading = false;
        state.products.push(action.payload);
        if (state.total) state.total += 1;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addProductLoading = false;
        state.addProductError = action.payload as string;
      })

      // Update Product cases
      .addCase(updateProduct.pending, (state) => {
        state.updateProductLoading = true;
        state.updateProductError = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updateProductLoading = false;
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateProductLoading = false;
        state.updateProductError = action.payload as string;
      })

      // Delete Product cases
      .addCase(deleteProduct.pending, (state) => {
        state.deleteProductLoading = true;
        state.deleteProductError = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteProductLoading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
        if (state.total) state.total -= 1;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteProductLoading = false;
        state.deleteProductError = action.payload as string;
      });
  },
});

export default productSlice.reducer;
