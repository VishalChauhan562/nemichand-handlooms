// src/pages/ReturnsPolicy/ReturnsPolicy.tsx
import { 
    RefreshCw, 
    Calendar, 
    PackageCheck, 
    CreditCard, 
    ShieldCheck,
    Truck,
    HelpCircle
  } from 'lucide-react';
  import './ReturnsPolicy.scss';
import React from 'react';
  
  const ReturnsPolicy = () => {
    // Timeline steps for the returns process
    const returnSteps = [
      {
        icon: PackageCheck,
        title: "Initiate Return",
        description: "Log into your account and initiate a return request within 7 days of delivery"
      },
      {
        icon: Truck,
        title: "Schedule Pickup",
        description: "Select a convenient date for our pickup partner to collect the item"
      },
      {
        icon: ShieldCheck,
        title: "Quality Check",
        description: "Our team inspects the returned item to ensure it meets return criteria"
      },
      {
        icon: CreditCard,
        title: "Refund Processed",
        description: "Refund is initiated to your original payment method within 5-7 business days"
      }
    ];
  
    // Return eligibility criteria
    const eligibilityCriteria = [
      "Item must be unused and in original packaging",
      "All tags and labels must be intact",
      "Return request initiated within 7 days of delivery",
      "Product should not be damaged or altered"
    ];
  
    return (
      <div className="returns-policy">
        <div className="returns-policy__container">
          <header className="returns-policy__header">
            <h1>Returns & Refunds</h1>
            <p>We want you to be completely satisfied with your purchase. Here's everything you need to know about our returns process.</p>
          </header>
  
          <section className="policy-section">
            <h2>Return Process</h2>
            <p className="section-description">
              Follow these simple steps to return your product and receive your refund:
            </p>
            
            <div className="return-timeline">
              {returnSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div className="timeline-item" key={index}>
                    <div className="timeline-icon">
                      <IconComponent size={24} />
                    </div>
                    <div className="timeline-content">
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                    {index < returnSteps.length - 1 && (
                      <div className="timeline-connector" />
                    )}
                  </div>
                );
              })}
            </div>
          </section>
  
          <section className="policy-section">
            <h2>Return Eligibility</h2>
            <div className="eligibility-card">
              <div className="eligibility-header">
                <Calendar size={24} />
                <h3>Return Window</h3>
              </div>
              <p>Items are eligible for returns within 7 days from the date of delivery.</p>
              
              <div className="eligibility-criteria">
                <h4>Your item must meet the following criteria:</h4>
                <ul>
                  {eligibilityCriteria.map((criteria, index) => (
                    <li key={index}>{criteria}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
  
          <section className="policy-section">
            <h2>Refund Information</h2>
            <div className="refund-info-grid">
              <div className="info-card">
                <RefreshCw size={24} />
                <h3>Processing Time</h3>
                <p>Refunds are typically processed within 5-7 business days after we receive and inspect your return.</p>
              </div>
              
              <div className="info-card">
                <CreditCard size={24} />
                <h3>Refund Method</h3>
                <p>Refunds will be issued to the original payment method used for the purchase.</p>
              </div>
            </div>
          </section>
  
          <section className="policy-section">
            <h2>Non-Returnable Items</h2>
            <div className="notice-card">
              <p>For hygiene and safety reasons, certain items cannot be returned:</p>
              <ul>
                <li>Products with broken seals or damaged packaging</li>
                <li>Items that show signs of use or alteration</li>
                <li>Products marked as "Final Sale" or "Non-Returnable"</li>
              </ul>
            </div>
          </section>
  
          <section className="policy-section help-section">
            <div className="help-content">
              <HelpCircle size={32} />
              <h2>Need Help?</h2>
              <p>Our customer service team is here to assist you with returns and refunds.</p>
              <div className="contact-methods">
                <a href="mailto:support@nemichand.com">Email: support@nemichand.com</a>
                <span>Phone: +91 98765 43210</span>
                <span>Available: Mon-Sat, 9 AM - 6 PM IST</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  };
  
  export default ReturnsPolicy;