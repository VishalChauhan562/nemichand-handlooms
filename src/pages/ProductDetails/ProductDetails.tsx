// src/pages/ProductDetails/ProductDetails.tsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, Minus, Plus, Star, Truck } from "lucide-react";
import "./ProductDetails.scss";
import Reviews from "@/components/Reviews/Reviews";
import React from "react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  images: string[];
  sizes?: string[];
  colors?: string[];
  description: string;
  details: string[];
}

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // Mock product data - in real app, fetch based on id
  const product: Product = {
    id: "1",
    name: "Premium Cotton Bedsheet",
    category: "Bedsheets",
    price: 2499,
    originalPrice: 2999,
    rating: 4.5,
    reviews: 128,
    images: [
      "https://dummyimage.com/600x600/000/fff",
      "https://dummyimage.com/600x600/000/fff",
      "https://dummyimage.com/600x600/000/fff",
    ],
    sizes: ["Single", "Double", "Queen", "King"],
    colors: ["White", "Beige", "Grey", "Blue"],
    description:
      "Handcrafted premium cotton bedsheet with traditional designs.",
    details: [
      "Material: 100% Cotton",
      "Thread Count: 300",
      "Dimensions: 90x100 inches",
      "Machine washable",
    ],
  };

  const isBedsheet = product.category === "Bedsheets";

  return (
    <div className="product-details">
      <div className="product-details__container">
        <div className="product-details__gallery">
          <div className="product-details__main-image">
            <img src={product.images[0]} alt={product.name} />
          </div>
          <div className="product-details__thumbnails">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} view ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="product-details__info">
          <h1 className="product-details__title">{product.name}</h1>

          <div className="product-details__rating">
            <div className="stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill={
                    i < Math.floor(product.rating) ? "currentColor" : "none"
                  }
                  className="star"
                />
              ))}
            </div>
            <span className="rating-value">{product.rating}</span>
            <span className="reviews-count">({product.reviews} reviews)</span>
          </div>

          <div className="product-details__price">
            <span className="current-price">₹{product.price}</span>
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice}</span>
            )}
          </div>

          {isBedsheet && (
            <>
              {product.sizes && (
                <div className="product-details__variant">
                  <h3>Select Size</h3>
                  <div className="variant-options">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`variant-btn ${
                          selectedSize === size ? "active" : ""
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && (
                <div className="product-details__variant">
                  <h3>Select Color</h3>
                  <div className="variant-options">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`variant-btn ${
                          selectedColor === color ? "active" : ""
                        }`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          <div className="product-details__quantity">
            <h3>Quantity</h3>
            <div className="quantity-selector">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                <Minus size={20} />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className="product-details__actions">
            <button
              className="add-to-cart"
              disabled={isBedsheet && (!selectedSize || !selectedColor)}
            >
              Add to Cart
            </button>
            <button className="wishlist">
              <Heart size={20} />
            </button>
          </div>

          <div className="product-details__shipping">
            <Truck size={20} />
            <p>Free shipping on orders above ₹999</p>
          </div>

          <div className="product-details__description">
            <h3>Product Description</h3>
            <p>{product.description}</p>
            <ul>
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>

          <div className="product-details__reviews">
            <Reviews
              rating={4.5}
              reviewCount={128}
              ratingDistribution={{
                5: 80,
                4: 30,
                3: 10,
                2: 5,
                1: 3,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
