// store/slices/initializationSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProfile } from "./authSlice";
import { fetchCategories } from "./categorySlice";
import { fetchProducts } from "./productSlice";
import { fetchCart } from "./cartSlice";
// Import other necessary actions

export const initializeApp = createAsyncThunk(
  "initialization/initializeApp",
  async (_, { dispatch }) => {
    try {
      // Fetch all initial data in parallel
      await Promise.all([
        dispatch(fetchProfile()).unwrap(),
        dispatch(fetchCategories()).unwrap(),
        dispatch(fetchProducts("")).unwrap(),
        dispatch(fetchCart()).unwrap(),
        // Add other initialization actions here
        // dispatch(fetchCategories()).unwrap(),
        // dispatch(fetchSettings()).unwrap(),
      ]);
    } catch (error) {
      console.error("Initialization failed:", error);
      throw error;
    }
  }
);

const initializationSlice = createSlice({
  name: "initialization",
  initialState: {
    isInitialized: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.fulfilled, (state) => {
        state.isInitialized = true;
        state.error = null;
      })
      .addCase(initializeApp.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.isInitialized = true;
      });
  },
});

export default initializationSlice.reducer;
