// Cart.tsx
import { useEffect, useState } from "react";
import { Minus, Plus, X, Truck, ShoppingBag } from "lucide-react";
import "./Cart.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
  selectCartItems,
  selectCartLoading,
  selectCartSubtotal,
  selectCartItemsCount,
  updateItemQuantityOptimistic,
} from "../../store/slices/cartSlice";
import { Link, NavLink } from "react-router-dom";

interface LoadingState {
  [key: number]: { updating?: boolean; removing?: boolean };
}

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const loading = useAppSelector(selectCartLoading);
  const subtotal = useAppSelector(selectCartSubtotal);
  const itemCount = useAppSelector(selectCartItemsCount);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const [itemLoadingStates, setItemLoadingStates] = useState<LoadingState>({});
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const fetchInitialCart = async () => {
      await dispatch(fetchCart());
      setIsInitialLoad(false);
    };
    fetchInitialCart();
  }, [dispatch]);

  const handleUpdateQuantity = async (id: number, quantity: number) => {
    if (quantity > 0) {
      const item = cartItems.find((item) => item.id === id);
      if (!item || !item.product || quantity > item.product.stock) return;

      setItemLoadingStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], updating: true },
      }));

      try {
        dispatch(updateItemQuantityOptimistic({ id, quantity }));
        await dispatch(updateCartItem({ id, quantity })).unwrap();
      } catch (error) {
        console.error("Failed to update quantity:", error);
        dispatch(fetchCart());
      } finally {
        setItemLoadingStates((prev) => ({
          ...prev,
          [id]: { ...prev[id], updating: false },
        }));
      }
    }
  };

  const handleRemoveItem = async (id: number) => {
    setItemLoadingStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], removing: true },
    }));

    try {
      await dispatch(removeFromCart(id)).unwrap();
    } catch (error) {
      console.error("Failed to remove item:", error);
      setItemLoadingStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], removing: false },
      }));
    }
  };

  const formatPrice = (price: number) => {
    return Number(price.toFixed(2)).toLocaleString("en-IN");
  };

  // Show loading state during initial fetch
  if (isInitialLoad || (loading && cartItems.length === 0)) {
    return (
      <div className="cart">
        <div className="cart__loading">
          <ShoppingBag size={48} />
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }

  // Show empty cart state
  if (!loading && cartItems.length === 0) {
    return (
      <div className="cart cart--empty">
        <ShoppingBag size={48} />
        <h2>Your cart is empty</h2>
        <p>Add items to your cart to proceed with checkout</p>
        <Link to="/products" className="cart__continue-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__container">
        <div className="cart__items">
          <h1>Shopping Cart ({itemCount} items)</h1>

          {cartItems.map((item) => {
            // Guard clause for type safety
            if (!item || !item.product) return null;

            const itemTotal = Number(item.product.price) * item.quantity;
            const itemState = itemLoadingStates[item.id] || {};

            return (
              <div key={item.id} className="cart__item">
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="cart__item-image"
                />

                <div className="cart__item-info">
                  <h3>{item.product.name}</h3>
                  <p className="cart__item-price">
                    ₹{formatPrice(Number(item.product.price))}
                  </p>
                </div>

                <div className="cart__item-quantity">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1 || itemState.updating}
                  >
                    <Minus size={16} />
                  </button>
                  <span>{itemState.updating ? "..." : item.quantity}</span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                    disabled={
                      item.quantity >= item.product.stock || itemState.updating
                    }
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="cart__item-subtotal">
                  ₹{formatPrice(itemTotal)}
                </div>

                <button
                  className="cart__item-remove"
                  onClick={() => handleRemoveItem(item.id)}
                  disabled={itemState.removing}
                >
                  <X
                    size={20}
                    className={itemState.removing ? "opacity-50" : ""}
                  />
                </button>
              </div>
            );
          })}
        </div>

        <div className="cart__summary">
          <h2>Order Summary</h2>

          <div className="cart__summary-row">
            <span>Subtotal</span>
            <span>₹{formatPrice(subtotal)}</span>
          </div>

          <div className="cart__summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
          </div>

          {shipping > 0 && (
            <div className="cart__shipping-note">
              <Truck size={16} />
              <p>Add ₹{formatPrice(1000 - subtotal)} more for free shipping</p>
            </div>
          )}

          <div className="cart__summary-row cart__summary-row--total">
            <span>Total</span>
            <span>₹{formatPrice(total)}</span>
          </div>

          <NavLink to="/checkout">
            <button className="cart__checkout-btn">Proceed to Checkout</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Cart;
