import { useState } from 'react';
import { Search, Filter, ChevronDown, ExternalLink } from 'lucide-react';
import './Orders.scss';
import React from 'react';

interface Order {
  id: string;
  customer: string;
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  date: string;
}

const AdminOrders = () => {
  const [orders] = useState<Order[]>([
    {
      id: '#12345',
      customer: 'John Doe',
      items: 2,
      total: 2499,
      status: 'delivered',
      date: '2024-01-02'
    },
    {
      id: '#12346',
      customer: 'Jane Smith',
      items: 3,
      total: 3998,
      status: 'processing',
      date: '2024-01-02'
    }
  ]);

  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    // API call to update order status
    console.log('Updating order', orderId, 'to', status);
  };

  return (
    <div className="admin-orders">
      <div className="admin-orders__header">
        <h1>Orders</h1>
      </div>

      <div className="admin-orders__toolbar">
        <div className="search-box">
          <Search size={20} />
          <input type="text" placeholder="Search orders..." />
        </div>

        <div className="filter-box">
          <Filter size={20} />
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="admin-orders__content">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.items}</td>
                <td>₹{order.total}</td>
                <td>
                  <div className="status-dropdown">
                    <button 
                      className={`status-badge ${order.status}`}
                      onClick={() => setSelectedOrder(
                        selectedOrder === order.id ? null : order.id
                      )}
                    >
                      {order.status}
                      <ChevronDown size={16} />
                    </button>
                    {selectedOrder === order.id && (
                      <div className="status-menu">
                        {['pending', 'processing', 'delivered', 'cancelled'].map(status => (
                          <button
                            key={status}
                            className={`status-option ${status}`}
                            onClick={() => {
                              updateOrderStatus(order.id, status as Order['status']);
                              setSelectedOrder(null);
                            }}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td>{order.date}</td>
                <td>
                  <button className="view-details-btn">
                    <ExternalLink size={16} />
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="admin-orders__pagination">
          <span>Showing 1-10 of 50 orders</span>
          <div className="pagination-buttons">
            <button disabled>Previous</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;