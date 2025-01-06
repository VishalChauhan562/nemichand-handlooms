// src/pages/ShippingPolicy/ShippingPolicy.tsx
import { Truck, Clock, MapPin, AlertCircle, IndianRupee, CheckCircle } from 'lucide-react';
import './ShippingPolicy.scss';
import React from 'react';

const ShippingPolicy = () => {
  // We define shipping methods with their details for easy maintenance
  const shippingMethods = [
    {
      name: 'Standard Delivery',
      time: '4-5 business days',
      cost: 'Free for orders above ₹999',
      description: 'Available for all pin codes across India',
      icon: Truck
    },
    {
      name: 'Express Delivery',
      time: '2-3 business days',
      cost: '₹100',
      description: 'Available for select metro cities',
      icon: Clock
    }
  ];

  return (
    <div className="shipping-policy">
      <div className="shipping-policy__container">
        <header className="shipping-policy__header">
          <h1>Shipping Policy</h1>
          <p>We aim to deliver your handcrafted products safely and on time</p>
        </header>

        <section className="shipping-policy__methods">
          <h2>Delivery Options</h2>
          <div className="methods-grid">
            {shippingMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div key={index} className="method-card">
                  <div className="method-icon">
                    <IconComponent size={24} />
                  </div>
                  <div className="method-content">
                    <h3>{method.name}</h3>
                    <p className="delivery-time">
                      <Clock size={16} />
                      {method.time}
                    </p>
                    <p className="delivery-cost">
                      <IndianRupee size={16} />
                      {method.cost}
                    </p>
                    <p className="delivery-description">{method.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="shipping-policy__details">
          <h2>Shipping Information</h2>
          
          <div className="info-card">
            <h3>Order Processing Time</h3>
            <p>All orders are processed within 24 hours of being placed. Orders placed after 5 PM IST will be processed the next business day.</p>
          </div>

          <div className="info-card">
            <h3>Delivery Areas</h3>
            <p>We currently deliver to all major cities and most pin codes across India. Enter your pin code during checkout to confirm delivery availability.</p>
            
            <div className="pincode-checker">
              <input 
                type="text" 
                placeholder="Enter your PIN code"
                maxLength={6}
              />
              <button>Check Availability</button>
            </div>
          </div>

          <div className="info-card">
            <h3>Tracking Your Order</h3>
            <p>Once your order is shipped, you will receive a tracking number via email and SMS. You can track your order status on our website using this number.</p>
          </div>
        </section>

        <section className="shipping-policy__notes">
          <h2>Important Notes</h2>
          
          <div className="notes-grid">
            <div className="note-item">
              <AlertCircle size={20} />
              <p>Orders placed on weekends or public holidays will be processed on the next business day.</p>
            </div>
            
            <div className="note-item">
              <MapPin size={20} />
              <p>Delivery times may vary for remote locations and during peak seasons.</p>
            </div>
            
            <div className="note-item">
              <CheckCircle size={20} />
              <p>All orders are insured during transit for your peace of mind.</p>
            </div>
          </div>
        </section>

        <section className="shipping-policy__contact">
          <h2>Need Help?</h2>
          <p>If you have any questions about shipping or delivery, please contact our customer support:</p>
          <div className="contact-info">
            <p>Email: support@nemichand.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Available Monday to Saturday, 9 AM to 6 PM IST</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;