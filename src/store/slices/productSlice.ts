// // src/store/slices/productSlice.ts
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import apiClient from "../../apiClient";
// import { ProductItem, ProductState } from "../types";

// const initialState: ProductState = {
//   products: [],
//   loading: false,
//   error: null,
// };

// export const fetchCategories = createAsyncThunk(
//   "product/fetchCategories",
//   async (_, { rejectWithValue }) => {
//     try {
//       // Change the type here to match ProductItem[]
//       const response = await apiClient.get<ProductItem[]>("/products");
//       return response.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// const productSlice = createSlice({
//   name: "product",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategories.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.loading = false;
//         // action.payload is now correctly typed as ProductItem[]
//         state.products = action.payload;
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });


// export default productSlice.reducer;  
