// src/components/Hero/Hero.tsx
import { useState, useEffect } from 'react';
import './Hero.scss';

interface HeroImage {
  id: number;
  desktop: string;
  mobile: string;
  alt: string;
  title: string;
  description: string;
}

const Hero: React.FC = () => {
  const heroImages: HeroImage[] = [
    {
      id: 1,
      desktop: "https://dummyimage.com/1200x600/000/fff",  // In production: high-res desktop image
      mobile: "https://dummyimage.com/600x800/000/fff",    // In production: optimized mobile image
      alt: "Handloom bedsheet collection",
      title: "Authentic Handloom Fabrics",
      description: "Elevate your home with traditional craftsmanship"
    },
    {
      id: 2,
      desktop: "https://dummyimage.com/1200x600/000/fff",  // In production: high-res desktop image
      mobile: "https://dummyimage.com/600x800/000/fff",    // In production: optimized mobile image
      alt: "Premium doormat collection",
      title: "Artisanal Doormats",
      description: "Where tradition meets modern design"
    }
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotate hero images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleSwipe = () => {
    // In a real application, add touch swipe handling here
    // using libraries like react-swipeable or hammer.js
  };

  return (
    <section className="hero">
      <div className="hero__container">
        <div className={`hero__image-container ${isMobile ? 'hero__image-container--mobile' : ''}`}>
          {heroImages.map((image, index) => (
            <div
              key={image.id}
              className={`hero__image-wrapper ${
                index === currentImage ? 'hero__image-wrapper--active' : ''
              }`}
            >
              {/* Use picture element for art direction */}
              <picture>
                <source
                  media="(min-width: 769px)"
                  srcSet={image.desktop}
                />
                <source
                  media="(max-width: 768px)"
                  srcSet={image.mobile}
                />
                <img
                  src={image.desktop}
                  alt={image.alt}
                  className="hero__image"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </picture>
            </div>
          ))}
          
          <div className="hero__indicators">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`hero__indicator ${
                  index === currentImage ? 'hero__indicator--active' : ''
                }`}
                onClick={() => setCurrentImage(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className={`hero__content ${isMobile ? 'hero__content--mobile' : ''}`}>
          <div className="hero__text-content">
            <h1 className="hero__title">
              {heroImages[currentImage].title}
            </h1>
            <p className="hero__description">
              {heroImages[currentImage].description}
            </p>
          </div>
          
          <div className="hero__cta">
            <button className="hero__button">Shop Now</button>
            <div className="hero__special-offer">
              <span className="hero__discount">Up to 50% Off</span>
              <span className="hero__offer-text">on selected items</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;