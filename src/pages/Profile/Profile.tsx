// src/pages/Profile/Profile.tsx
import { useState } from "react";
import { User, MapPin, Phone, Mail, Camera, X } from "lucide-react";
import "./Profile.scss";
import OrderHistory from "../OrderHistory/OrderHistory";
import React from "react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}

interface Address {
  id: string;
  type: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

// Add these interfaces to the existing ones
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: "delivered" | "processing" | "cancelled";
  total: number;
  items: OrderItem[];
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 98765 43210",
    addresses: [
      {
        id: "1",
        type: "Home",
        street: "123 Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        isDefault: true,
      },
    ],
  });

  const [orders] = useState<Order[]>([
    {
      id: "12345",
      date: "2024-01-02",
      status: "delivered",
      total: 2499,
      items: [
        {
          id: "1",
          name: "Premium Cotton Bedsheet",
          quantity: 1,
          price: 2499,
          size: "Queen",
          color: "White",
          image: "https://dummyimage.com/400x600/000/fff",
        },
      ],
    },
    {
      id: "12346",
      date: "2024-01-02",
      status: "processing",
      total: 3998,
      items: [
        {
          id: "2",
          name: "Traditional Doormat",
          quantity: 2,
          price: 1999,
          image: "https://dummyimage.com/400x600/000/fff",
        },
      ],
    },
  ]);

  const handleReorder = (orderId: string) => {
    // Add reorder functionality
    console.log("Reordering order:", orderId);
  };

  const handleTrackOrder = (orderId: string) => {
    // Add tracking functionality
    console.log("Tracking order:", orderId);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState<Omit<Address, "id">>({
    type: "Home",
    street: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });

  const handleProfileUpdate = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const addAddress = () => {
    const address = {
      ...newAddress,
      id: Date.now().toString(),
    };
    setProfile((prev) => ({
      ...prev,
      addresses: [...prev.addresses, address],
    }));
    setShowAddressModal(false);
    setNewAddress({
      type: "Home",
      street: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: false,
    });
  };

  return (
    <div className="profile">
      <div className="profile__header">
        <div className="profile__avatar">
          <User size={40} />
          <button className="camera-btn">
            <Camera size={16} />
          </button>
        </div>
        <div className="profile__info">
          <h1>{profile.name}</h1>
          <div className="contact-info">
            <span>
              <Mail size={16} /> {profile.email}
            </span>
            <span>
              <Phone size={16} /> {profile.phone}
            </span>
          </div>
        </div>
      </div>

      <div className="profile__content">
        <section className="profile__section">
          <div className="section-header">
            <h2>Personal Information</h2>
            <button
              className="edit-btn"
              onClick={() => {
                if (isEditing) {
                  handleProfileUpdate();
                } else {
                  setEditedProfile(profile);
                  setIsEditing(true);
                }
              }}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          <div className="profile-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={isEditing ? editedProfile.name : profile.name}
                onChange={(e) =>
                  setEditedProfile({
                    ...editedProfile,
                    name: e.target.value,
                  })
                }
                disabled={!isEditing}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={isEditing ? editedProfile.email : profile.email}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      email: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={isEditing ? editedProfile.phone : profile.phone}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      phone: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="profile__section">
          <div className="section-header">
            <h2>Saved Addresses</h2>
            <button
              className="add-btn"
              onClick={() => setShowAddressModal(true)}
            >
              Add New Address
            </button>
          </div>

          <div className="addresses-grid">
            {profile.addresses.map((address) => (
              <div key={address.id} className="address-card">
                <div className="address-type">
                  {address.type}
                  {address.isDefault && (
                    <span className="default-badge">Default</span>
                  )}
                </div>
                <div className="address-content">
                  <MapPin size={16} />
                  <p>
                    {address.street}
                    <br />
                    {address.city}, {address.state}
                    <br />
                    {address.pincode}
                  </p>
                </div>
                <div className="address-actions">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {showAddressModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Address</h2>
              <button
                className="close-btn"
                onClick={() => setShowAddressModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addAddress();
              }}
            >
              <div className="form-row">
                <div className="form-group">
                  <label>Address Type</label>
                  <select
                    value={newAddress.type}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        type: e.target.value,
                      })
                    }
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={newAddress.isDefault}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          isDefault: e.target.checked,
                        })
                      }
                    />
                    Set as default address
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Street Address</label>
                <textarea
                  value={newAddress.street}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      street: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        city: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    value={newAddress.state}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        state: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input
                    type="text"
                    value={newAddress.pincode}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        pincode: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowAddressModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <OrderHistory
        orders={orders}
        onTrackOrder={handleTrackOrder}
        onReorder={handleReorder}
      />
    </div>
  );
};

export default Profile;
