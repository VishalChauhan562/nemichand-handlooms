import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Hero from "./components/Hero/Hero";
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import Newsletter from "./components/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import AdminDashboard from "./pages/Admin/Dashboard/Dashboard";
import AdminOrders from "./pages/Admin/Orders/Orders";
import Profile from "./pages/Profile/Profile";
import ShippingPolicy from "./pages/ShippingPolicy/ShippingPolicy";
import ReturnsPolicy from "./pages/ReturnsPolicy/ReturnsPolicy";
import React, { useEffect } from "react";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

import Loader from "./components/Loader/Loader";
import InitializationProvider from "./components/InitializationProvider";
import AdminProducts2 from "./pages/Admin/Products/AdminProducts";
import AdminProducts from "./pages/Admin/Products/AdminProducts";
import { ToastContainer } from "react-toastify";
import ProductList from "./pages/ProductList/ProductList";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <InitializationProvider>
        <div className="mainBody">
          <Header />
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />

            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/returns-policy" element={<ReturnsPolicy />} />
            <Route path="/loader" element={<Loader />} />
            <Route
              path="/"
              element={
                <>
                  <main>
                    <Hero />
                    <Categories />
                    <FeaturedProducts />
                    <Newsletter />
                  </main>
                </>
              }
            />
          </Routes>
          <Footer />
        </div>
        <ToastContainer />
      </InitializationProvider>
    </BrowserRouter>
  );
};

export default App;
