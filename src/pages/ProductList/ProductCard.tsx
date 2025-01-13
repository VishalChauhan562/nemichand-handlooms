import React, { useEffect, useState } from "react";
import { ProductItem } from "../../store/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addToCart,
  fetchCart,
  removeFromCart,
  selectCartItems,
  updateCartItem,
  updateItemQuantityOptimistic,
} from "../../store/slices/cartSlice";
import { Minus, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";

interface ProductCardProps {
  product: ProductItem;
  onAddToCart: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({ product }) => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
      const cartItem = cartItems.find(
        (item) => item?.product?.id === product.id
      );
      setQuantity(cartItem?.quantity || 0);
    }, [cartItems, product.id]);
    console.log("here");

    const handleQuantityChange = async (operation: "add" | "subtract") => {
      if (!product?.id) return;
      const newQuantity = operation === "add" ? quantity + 1 : quantity - 1;
      

      try {
        const cartItem = cartItems.find(
          (item) => item.product?.id === product.id
        );

        if (cartItem) {
          if (newQuantity === 0) {
            await dispatch(removeFromCart(cartItem.id)).unwrap();
          } else {
            await dispatch(
              updateCartItem({ id: cartItem.id, quantity: newQuantity })
            ).unwrap();
          }
        } else if (newQuantity > 0) {
          await dispatch(
            addToCart({ product_id: product.id, quantity: newQuantity })
          ).unwrap();
        }

        await dispatch(fetchCart()).unwrap();
      } catch (error) {
        console.error("Error updating cart:", error);
        dispatch(fetchCart());
      }
    };

    return (
      <div className="product-card">
        <img src={product.image_url} alt={product.name} />
        <div className="product-info">
          <h3>{product.name}</h3>
          <div className="price">
            <span className="current-price">₹{product.price}</span>
            <span className="original-price">₹{product.price}</span>
          </div>
          <div className="rating">Rating: 4.5</div>
          {quantity === 0 ? (
            <button
              className="add-to-cart"
              onClick={() => handleQuantityChange("add")}
            >
              Add to Cart
            </button>
          ) : (
            <div className="qunatity-btn-container">
              <button
                className="qunatity-btn"
                onClick={() => handleQuantityChange("subtract")}
              >
                <Minus size={20} />
              </button>
              <span style={{ fontSize: "large" }}>{quantity}</span>
              <button
                className="qunatity-btn"
                onClick={() => handleQuantityChange("add")}
              >
                <Plus size={20} />
              </button>
              <NavLink to="/cart">
                <button className="add-to-cart">Go to Cart</button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    );
  }
);
