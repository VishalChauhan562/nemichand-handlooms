// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import initializeReducer from "./slices/initializationSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    auth: authReducer,
    product: productReducer,
    initialization: initializeReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
