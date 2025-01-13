// src/pages/Checkout/Checkout.tsx
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import "./Checkout.scss";
import React from "react";
import { useDispatch } from "react-redux";
import { createOrder } from "../../store/slices/orderSlice";
import apiClient from "../../apiClient";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

type CheckoutStep = "shipping" | "payment" | "confirmation";

interface ShippingDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

const Checkout = () => {
  const { cart_id } = useAppSelector((state) => state.cart);
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
  });
  const [razorpayOrder, setRazorpayOrder] = useState<any>(null);
  const dispatch = useAppDispatch();

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await dispatch(
        createOrder({
          shipping_address: shippingDetails,
          payment_method: "razorpay",
        })
      ).unwrap();

      // Store the Razorpay order details
      setRazorpayOrder(response.razorpayOrder);
      setCurrentStep("payment");
    } catch (error) {
      alert("Failed to create order: " + error);
    }
  };

  const handlePayment = async () => {
    if (!razorpayOrder) {
      alert("Order not found. Please try again.");
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY, // Replace with your Razorpay Key ID
      amount: razorpayOrder.amount, // Amount in paise
      currency: razorpayOrder.currency,
      name: "Your App Name",
      description: "Test Transaction",
      order_id: razorpayOrder.id, // Razorpay Order ID
      handler: async function (response: any) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response;

        try {
          // Verify payment on the backend
          const verifyResponse = await apiClient.post("/verify", {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            cart_id,
          });

          if (verifyResponse.data.success) {
            setCurrentStep("confirmation");
          } else {
            alert("Payment verification failed");
          }
        } catch (error) {
          alert("Error verifying payment: " + error.message);
        }
      },
      prefill: {
        name: shippingDetails.name,
        email: shippingDetails.email,
        contact: shippingDetails.phone,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  };

  const renderShippingForm = () => (
    <form onSubmit={handleShippingSubmit} className="checkout__form">
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          value={shippingDetails.name}
          onChange={(e) =>
            setShippingDetails({ ...shippingDetails, name: e.target.value })
          }
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={shippingDetails.email}
            onChange={(e) =>
              setShippingDetails({ ...shippingDetails, email: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            value={shippingDetails.phone}
            onChange={(e) =>
              setShippingDetails({ ...shippingDetails, phone: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          value={shippingDetails.address}
          onChange={(e) =>
            setShippingDetails({ ...shippingDetails, address: e.target.value })
          }
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={shippingDetails.city}
            onChange={(e) =>
              setShippingDetails({ ...shippingDetails, city: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            value={shippingDetails.state}
            onChange={(e) =>
              setShippingDetails({ ...shippingDetails, state: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            value={shippingDetails.country}
            onChange={(e) =>
              setShippingDetails({
                ...shippingDetails,
                country: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="zip_code">Pincode</label>
          <input
            type="text"
            id="zip_code"
            value={shippingDetails.zip_code}
            onChange={(e) =>
              setShippingDetails({
                ...shippingDetails,
                zip_code: e.target.value,
              })
            }
            required
          />
        </div>
      </div>

      <button type="submit" className="checkout__submit-btn">
        Continue to Payment <ChevronRight size={20} />
      </button>
    </form>
  );

  const renderPaymentSection = () => (
    <div className="checkout__payment">
      <h2>Choose Payment Method</h2>
      <div className="payment-options">
        <button onClick={handlePayment} className="payment-btn">
          Pay with Razorpay
        </button>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="checkout__confirmation">
      <div className="confirmation-message">
        <h2>Order Confirmed!</h2>
        <p>Your order has been placed successfully.</p>
        <p>Order ID: #123456</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="continue-shopping-btn"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );

  return (
    <div className="checkout">
      <div className="checkout__container">
        <div className="checkout__steps">
          {["shipping", "payment", "confirmation"].map((step, index) => (
            <div
              key={step}
              className={`checkout__step ${
                currentStep === step ? "active" : ""
              } ${
                index <
                ["shipping", "payment", "confirmation"].indexOf(currentStep) + 1
                  ? "completed"
                  : ""
              }`}
            >
              <span className="step-number">{index + 1}</span>
              <span className="step-name">{step}</span>
            </div>
          ))}
        </div>

        <div className="checkout__content">
          {currentStep === "shipping" && renderShippingForm()}
          {currentStep === "payment" && renderPaymentSection()}
          {currentStep === "confirmation" && renderConfirmation()}

          <div className="checkout__summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹3398</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹3398</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
