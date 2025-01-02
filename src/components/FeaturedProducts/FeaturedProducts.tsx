// src/components/FeaturedProducts/FeaturedProducts.tsx
import React, { useState } from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import './FeaturedProducts.scss';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  imageUrl: string;
  category: string;
}

const FeaturedProducts: React.FC = () => {
  // In a real application, this would come from your backend
  const featuredProducts: Product[] = [
    {
      id: '1',
      name: 'Traditional Cotton Bedsheet',
      description: 'Hand-woven pure cotton bedsheet with traditional patterns',
      price: 2499,
      originalPrice: 3499,
      rating: 4.5,
      imageUrl: 'https://dummyimage.com/400x600/000/fff',
      category: 'Bedsheets'
    },
    {
      id: '2',
      name: 'Artisanal Doormat Set',
      description: 'Set of 2 handcrafted doormats with ethnic designs',
      price: 899,
      rating: 4.8,
      imageUrl: 'https://dummyimage.com/400x600/000/fff',
      category: 'Doormats'
    },
    {
      id: '3',
      name: 'Premium Floor Runner',
      description: 'Long-lasting handloom floor runner with modern patterns',
      price: 1899,
      originalPrice: 2299,
      rating: 4.3,
      imageUrl: 'https://dummyimage.com/400x600/000/fff',
      category: 'Floormats'
    },
    {
      id: '4',
      name: 'Decorative Table Cover',
      description: 'Elegant handwoven table cover for 6-seater dining table',
      price: 1299,
      rating: 4.6,
      imageUrl: 'https://dummyimage.com/400x600/000/fff',
      category: 'Table Covers'
    }
  ];

  // State for wishlist and cart interactions
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [addedToCart, setAddedToCart] = useState<Set<string>>(new Set());

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const updated = new Set(prev);
      if (updated.has(productId)) {
        updated.delete(productId);
      } else {
        updated.add(productId);
      }
      return updated;
    });
  };

  const addToCart = (productId: string) => {
    setAddedToCart(prev => new Set([...prev, productId]));
    // In a real application, this would integrate with your cart management system
    setTimeout(() => {
      setAddedToCart(prev => {
        const updated = new Set(prev);
        updated.delete(productId);
        return updated;
      });
    }, 2000);
  };

  const formatPrice = (price: number): string => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const renderRatingStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`featured-products__star ${
          index < Math.floor(rating) ? 'featured-products__star--filled' : ''
        }`}
        fill={index < Math.floor(rating) ? 'currentColor' : 'none'}
      />
    ));
  };

  return (
    <section className="featured-products">
      <div className="featured-products__container">
        <div className="featured-products__header">
          <h2 className="featured-products__title">Featured Products</h2>
          <p className="featured-products__subtitle">
            Discover our most popular handloom collections
          </p>
        </div>

        <div className="featured-products__grid">
          {featuredProducts.map((product) => (
            <article key={product.id} className="featured-products__item">
              <div className="featured-products__image-wrapper">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="featured-products__image"
                  loading="lazy"
                />
                <button
                  className={`featured-products__wishlist-btn ${
                    wishlist.has(product.id) ? 'featured-products__wishlist-btn--active' : ''
                  }`}
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={`Add ${product.name} to wishlist`}
                >
                  <Heart 
                    size={20}
                    fill={wishlist.has(product.id) ? 'currentColor' : 'none'}
                  />
                </button>
                <span className="featured-products__category-tag">
                  {product.category}
                </span>
              </div>

              <div className="featured-products__content">
                <h3 className="featured-products__product-name">
                  {product.name}
                </h3>
                <p className="featured-products__description">
                  {product.description}
                </p>

                <div className="featured-products__rating">
                  {renderRatingStars(product.rating)}
                  <span className="featured-products__rating-value">
                    {product.rating}
                  </span>
                </div>

                <div className="featured-products__price-row">
                  <div className="featured-products__price-container">
                    <span className="featured-products__price">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="featured-products__original-price">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <button
                    className={`featured-products__cart-btn ${
                      addedToCart.has(product.id) ? 'featured-products__cart-btn--added' : ''
                    }`}
                    onClick={() => addToCart(product.id)}
                    disabled={addedToCart.has(product.id)}
                  >
                    <ShoppingCart size={20} />
                    {addedToCart.has(product.id) ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;