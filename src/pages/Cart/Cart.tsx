// src/pages/Cart/Cart.tsx
import { useState } from 'react';
import { Minus, Plus, X, Truck, ShoppingBag } from 'lucide-react';
import './Cart.scss';
import React from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Premium Cotton Bedsheet',
      price: 2499,
      quantity: 2,
      image: 'https://dummyimage.com/400x600/000/fff',
      size: 'Queen',
      color: 'White'
    },
    {
      id: '2',
      name: 'Traditional Doormat',
      price: 899,
      quantity: 1,
      image: 'https://dummyimage.com/400x600/000/fff'
    }
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="cart cart--empty">
        <ShoppingBag size={48} />
        <h2>Your cart is empty</h2>
        <p>Add items to your cart to proceed with checkout</p>
        <button className="cart__continue-btn">Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__container">
        <div className="cart__items">
          <h1>Shopping Cart ({cartItems.length} items)</h1>
          
          {cartItems.map(item => (
            <div key={item.id} className="cart__item">
              <img src={item.image} alt={item.name} className="cart__item-image" />
              
              <div className="cart__item-info">
                <h3>{item.name}</h3>
                {(item.size || item.color) && (
                  <p className="cart__item-variants">
                    {item.size && <span>Size: {item.size}</span>}
                    {item.color && <span>Color: {item.color}</span>}
                  </p>
                )}
                <p className="cart__item-price">₹{item.price}</p>
              </div>

              <div className="cart__item-quantity">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Plus size={16} />
                </button>
              </div>

              <div className="cart__item-subtotal">
                ₹{item.price * item.quantity}
              </div>

              <button 
                className="cart__item-remove"
                onClick={() => removeItem(item.id)}
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="cart__summary">
          <h2>Order Summary</h2>
          
          <div className="cart__summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          
          <div className="cart__summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
          </div>
          
          {shipping > 0 && (
            <div className="cart__shipping-note">
              <Truck size={16} />
              <p>Add ₹{1000 - subtotal} more for free shipping</p>
            </div>
          )}
          
          <div className="cart__summary-row cart__summary-row--total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button className="cart__checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;