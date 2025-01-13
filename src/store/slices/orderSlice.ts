import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../../apiClient";

interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  product: {
    id: number;
    name: string;
    price: number;
    image_url: string;
  };
}

interface Payment {
  id: number;
  payment_method: string;
  amount: number;
  payment_date: string;
}

interface Shipment {
  id: number;
  address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  status: string;
  shipment_date: string;
}

interface Order {
  id: number;
  user_id: number;
  total_price: number;
  order_date: string;
  status: string;
  orderItems: OrderItem[];
  payment: Payment;
  shipment: Shipment;
}

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (
    orderData: { shipping_address: any; payment_method: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post("/order", orderData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create order"
      );
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/orders");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (orderId: number, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/orders/${orderId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order"
      );
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateStatus",
  async (
    { orderId, status }: { orderId: number; status: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.patch(
        `/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update order status"
      );
    }
  }
);

export const processOrderPayment = createAsyncThunk(
  "order/processPayment",
  async (
    {
      orderId,
      paymentData,
    }: {
      orderId: number;
      paymentData: { payment_method: string; payment_details: any };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post(
        `/orders/${orderId}/payment`,
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to process payment"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
      state.error = null;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.currentOrder = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Order By Id
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        if (state.currentOrder?.id === action.payload.id) {
          state.currentOrder = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Process Payment
      .addCase(processOrderPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processOrderPayment.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentOrder) {
          state.currentOrder.payment = action.payload;
        }
      })
      .addCase(processOrderPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;

// Selectors
export const selectOrders = (state: { order: OrderState }) =>
  state.order.orders;
export const selectCurrentOrder = (state: { order: OrderState }) =>
  state.order.currentOrder;
export const selectOrderLoading = (state: { order: OrderState }) =>
  state.order.loading;
export const selectOrderError = (state: { order: OrderState }) =>
  state.order.error;
