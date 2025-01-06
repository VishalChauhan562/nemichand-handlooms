// src/store/slices/categorySlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../apiClient";
import { CategoryItem, CategoryState } from "../types";

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      // Change the type here to match CategoryItem[]
      const response = await apiClient.get<CategoryItem[]>("/categories");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        // action.payload is now correctly typed as CategoryItem[]
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export default categorySlice.reducer;  
