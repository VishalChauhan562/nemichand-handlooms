// src/components/Reviews/Reviews.tsx
import { useState } from 'react';
import { Star, X, ImageIcon } from 'lucide-react';
import './Reviews.scss';

interface ReviewsProps {
  rating: number;
  reviewCount: number;
  ratingDistribution: { [key: number]: number };
}

interface ReviewsProps {
    rating: number;
    reviewCount: number;
    ratingDistribution: { [key: number]: number };
  }
  
const ReviewModal = ({ onClose, onSubmit }: { 
    onClose: () => void;
    onSubmit: (review: any) => void;
  }) => {
    const [reviewForm, setReviewForm] = useState({
      rating: 5,
      title: '',
      comment: '',
      images: [] as File[]
    });
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(reviewForm);
    };
  
    return (
      <div className="review-modal" onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}>
        <div className="review-modal__content">
          <div className="review-modal__header">
            <h2>Write a Review</h2>
            <button className="close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
  
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Overall Rating</label>
              <div className="rating-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                    className={`star ${star <= reviewForm.rating ? 'filled' : ''}`}
                  />
                ))}
              </div>
            </div>
  
            <div className="form-group">
              <label htmlFor="review-title">Review Title</label>
              <input
                type="text"
                id="review-title"
                value={reviewForm.title}
                onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                placeholder="Summarize your experience"
                required
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="review-comment">Review Details</label>
              <textarea
                id="review-comment"
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                placeholder="Tell us what you liked or disliked about the product"
                required
              />
            </div>
  
            <div className="form-group">
              <label>Add Photos</label>
              <div className="image-upload">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      setReviewForm({
                        ...reviewForm,
                        images: Array.from(e.target.files)
                      });
                    }
                  }}
                />
                <div className="upload-placeholder">
                  <ImageIcon size={24} />
                  <span>Click to add photos</span>
                </div>
              </div>
            </div>
  
            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  

const Reviews: React.FC<ReviewsProps> = ({ rating, reviewCount, ratingDistribution }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSubmitReview = (reviewData: any) => {
    // Here you would typically send the review to your backend
    console.log('Submitting review:', reviewData);
    setShowReviewForm(false);
  };

  const renderStars = (value: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index}
        className={`star ${index < value ? 'filled' : ''}`}
        size={16}
      />
    ));
  };

  const calculatePercentage = (count: number) => {
    return (count / reviewCount) * 100;
  };

  return (
    <section className="product-reviews">
      <div className="review-summary">
        <div className="rating-overview">
          <span className="rating-value">{rating}</span>
          <div className="rating-stars">
            {renderStars(rating)}
          </div>
          <span className="review-count">({reviewCount} reviews)</span>
        </div>

        <div className="rating-bars">
          {[5, 4, 3, 2, 1].map(stars => (
            <div key={stars} className="rating-bar">
              <span>{stars} stars</span>
              <div className="bar">
                <div 
                  className="bar-fill"
                  style={{ width: `${calculatePercentage(ratingDistribution[stars] || 0)}%` }}
                />
              </div>
              <span className="count">{ratingDistribution[stars] || 0}</span>
            </div>
          ))}
        </div>
      </div>

      <button 
        className="write-review-btn"
        onClick={() => setShowReviewForm(true)}
      >
        Write a Review
      </button>

      <div className="reviews-list">
        {/* Example review */}
        <div className="review-item">
          <div className="review-header">
            <div className="user-info">
              <span className="user-name">Jane D.</span>
              <span className="verified-tag">Verified Purchase</span>
            </div>
            <div className="rating">
              {renderStars(5)}
            </div>
          </div>
          
          <h4 className="review-title">Excellent quality and fast delivery</h4>
          <p className="review-content">
            The bedsheet quality is amazing. The cotton is soft and the stitching is perfect.
          </p>
          
          {/* Add review images if available */}
          <div className="review-images">
            <img src="https://dummyimage.com/400x400/000/fff" alt="Product review" />
          </div>
        </div>
      </div>
      {showReviewForm && (
        <ReviewModal
          onClose={() => setShowReviewForm(false)}
          onSubmit={handleSubmitReview}
        />
      )}
    </section>
  );
};

export default Reviews;