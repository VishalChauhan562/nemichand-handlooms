// src/pages/Admin/Dashboard/Dashboard.tsx
import { useEffect, useState } from 'react';
import { BarChart, LineChart, ChevronRight, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import './Dashboard.scss';
import React from 'react';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
}

interface OrderStatus {
  delivered: number;
  processing: number;
  cancelled: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 156,
    totalRevenue: 142500,
    totalCustomers: 89,
    totalProducts: 45
  });

  const [orderStatus, setOrderStatus] = useState<OrderStatus>({
    delivered: 120,
    processing: 28,
    cancelled: 8
  });

  const [recentOrders] = useState([
    { id: '#12345', customer: 'John Doe', amount: 2499, status: 'Delivered', date: '2024-01-02' },
    { id: '#12346', customer: 'Jane Smith', amount: 3998, status: 'Processing', date: '2024-01-02' },
    { id: '#12347', customer: 'Mike Wilson', amount: 1899, status: 'Processing', date: '2024-01-01' },
  ]);

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard__header">
        <h1>Dashboard</h1>
        <button className="view-all-btn">
          View All Stats <ChevronRight size={20} />
        </button>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card__icon orders">
            <ShoppingCart size={24} />
          </div>
          <div className="stat-card__content">
            <h3>Total Orders</h3>
            <p className="stat-value">{stats.totalOrders}</p>
            <span className="stat-label">Last 30 days</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon revenue">
            <TrendingUp size={24} />
          </div>
          <div className="stat-card__content">
            <h3>Revenue</h3>
            <p className="stat-value">₹{stats.totalRevenue.toLocaleString()}</p>
            <span className="stat-label">Last 30 days</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon customers">
            <Users size={24} />
          </div>
          <div className="stat-card__content">
            <h3>Customers</h3>
            <p className="stat-value">{stats.totalCustomers}</p>
            <span className="stat-label">Total customers</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon products">
            <Package size={24} />
          </div>
          <div className="stat-card__content">
            <h3>Products</h3>
            <p className="stat-value">{stats.totalProducts}</p>
            <span className="stat-label">Active products</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card orders-chart">
          <div className="card-header">
            <h2>Orders Overview</h2>
            <div className="status-pills">
              <span className="status-pill delivered">
                Delivered ({orderStatus.delivered})
              </span>
              <span className="status-pill processing">
                Processing ({orderStatus.processing})
              </span>
              <span className="status-pill cancelled">
                Cancelled ({orderStatus.cancelled})
              </span>
            </div>
          </div>
          <div className="chart-container">
            <BarChart size={24} />
            <p className="placeholder-text">Orders chart will be displayed here</p>
          </div>
        </div>

        <div className="dashboard-card revenue-chart">
          <div className="card-header">
            <h2>Revenue Trends</h2>
          </div>
          <div className="chart-container">
            <LineChart size={24} />
            <p className="placeholder-text">Revenue chart will be displayed here</p>
          </div>
        </div>
      </div>

      <div className="dashboard-card recent-orders">
              <div className="card-header">
          <h2>Recent Orders</h2>
          <button className="view-all-btn">View All</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>₹{order.amount}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;