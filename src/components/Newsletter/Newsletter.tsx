// src/components/Newsletter/Newsletter.tsx
import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import './Newsletter.scss';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="newsletter">
      <div className="newsletter__background">
        <img 
          src="https://dummyimage.com/1200x400/000/fff" 
          alt="Newsletter background"
          className="newsletter__background-image"
        />
      </div>
      
      <div className="newsletter__container">
        <div className="newsletter__content">
          <h2 className="newsletter__title">
            Subscribe to Our Newsletter
          </h2>
          <p className="newsletter__description">
            Stay updated with our latest collections and exclusive offers
          </p>

          <form 
            className="newsletter__form"
            onSubmit={handleSubmit}
          >
            <div className="newsletter__input-group">
              <Mail className="newsletter__input-icon" size={20} />
              <input
                type="email"
                className="newsletter__input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                disabled={status === 'loading' || status === 'success'}
              />
            </div>

            <button
              type="submit"
              className={`newsletter__submit-btn ${
                status === 'loading' ? 'newsletter__submit-btn--loading' : ''
              }`}
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {status === 'success' && (
            <div className="newsletter__message newsletter__message--success">
              <CheckCircle size={20} />
              <span>Thank you for subscribing!</span>
            </div>
          )}

          {status === 'error' && (
            <div className="newsletter__message newsletter__message--error">
              <AlertCircle size={20} />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;