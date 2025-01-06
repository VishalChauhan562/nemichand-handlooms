// src/components/OrderHistory/OrderHistory.tsx
import React from 'react';
import './OrderHistory.scss';
import { ChevronRight, Box } from 'lucide-react';

interface OrderHistoryProps {
  orders: Order[];
  onTrackOrder: (orderId: string) => void;
  onReorder: (orderId: string) => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ 
  orders, 
  onTrackOrder, 
  onReorder 
}) => {
  return (
    <section className="order-history">
      <div className="order-history__header">
        <div>
          <h2>My Orders</h2>
          <p>{orders.length} orders placed</p>
        </div>
      </div>

      <div className="order-history__list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-card__header">
              <div className="order-info">
                <div className="order-meta">
                  <span className="order-date">Ordered on {order.date}</span>
                  <span className="order-id">Order #{order.id}</span>
                </div>
                <span className={`order-status ${order.status}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-total">
                <span>Total:</span>
                <span className="amount">₹{order.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="order-card__items">
              {order.items.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <div className="item-meta">
                      <span>Qty: {item.quantity}</span>
                      {item.size && <span>Size: {item.size}</span>}
                      {item.color && <span>Color: {item.color}</span>}
                    </div>
                    <span className="item-price">
                      ₹{item.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-card__actions">
              <button 
                className="btn-track"
                onClick={() => onTrackOrder(order.id)}
              >
                Track Package
                <ChevronRight size={16} />
              </button>
              <button 
                className="btn-reorder"
                onClick={() => onReorder(order.id)}
              >
                Buy Again
                <Box size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderHistory;