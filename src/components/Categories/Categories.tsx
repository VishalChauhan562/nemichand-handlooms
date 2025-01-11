// src/components/Categories/Categories.tsx
import { useEffect, useState } from "react";
import "./Categories.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";

interface Category {
  id: string;
  name: string;
  desktopImage: string;
  mobileImage: string;
  itemCount: number;
  description?: string;
  featured?: boolean;
}

const Categories: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); // Use typed dispatch
  const { categories, error, loading } = useSelector(
    (state: RootState) => state.category
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // const categories: Category[] = [
  //   {
  //     id: 'bedsheets',
  //     name: 'Bedsheets',
  //     desktopImage: 'https://dummyimage.com/1200x600/000/fff',
  //     mobileImage: 'https://dummyimage.com/800x600/000/fff',
  //     itemCount: 24,
  //     description: 'Experience the luxury of handwoven bedsheets crafted with tradition',
  //     featured: true
  //   },
  //   {
  //     id: 'doormats',
  //     name: 'Doormats',
  //     desktopImage: 'https://dummyimage.com/400x600/000/fff',
  //     mobileImage: 'https://dummyimage.com/400x600/000/fff',
  //     itemCount: 18,
  //     description: 'Traditional handcrafted doormats for your entryway'
  //   },
  //   {
  //     id: 'floormats',
  //     name: 'Floormats',
  //     desktopImage: 'https://dummyimage.com/400x600/000/fff',
  //     mobileImage: 'https://dummyimage.com/400x600/000/fff',
  //     itemCount: 15,
  //     description: 'Premium quality floormats designed for comfort and style'
  //   },
  //   {
  //     id: 'tablecovers',
  //     name: 'Table Covers',
  //     desktopImage: 'https://dummyimage.com/400x600/000/fff',
  //     mobileImage: 'https://dummyimage.com/400x600/000/fff',
  //     itemCount: 20,
  //     description: 'Elegant table covers for special occasions'
  //   }
  // ];

  // console.log("categories===>",categories);

  return (
    <section className="categories">
      <div className="categories__container">
        <div className="categories__header">
          <h2 className="categories__title">Our Collections</h2>
          <p className="categories__subtitle">
            Discover our handpicked selection of handloom treasures
          </p>
        </div>

        <div className="categories__grid">
          {categories.map((category) => (
            <article
              key={category.id}
              className={`categories__item ${
                category.featured ? "categories__item--featured" : ""
              }`}
            >
              <div className="categories__item-image-wrapper">
                <picture>
                  {/* Mobile image will be used for screens up to 768px */}
                  <source
                    media="(max-width: 768px)"
                    srcSet={category.mobileImage}
                  />
                  {/* Desktop image will be used for larger screens */}
                  <source
                    media="(min-width: 769px)"
                    srcSet={category.desktopImage}
                  />
                  <img
                    src={category.desktopImage}
                    alt={`${category.name} Collection`}
                    className="categories__item-image"
                    loading={category.featured ? "eager" : "lazy"}
                  />
                </picture>

                <div className="categories__item-overlay">
                  {category.description && (
                    <p className="categories__item-description">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="categories__item-content">
                <h3 className="categories__item-title">{category.name}</h3>
                <button
                  className="categories__item-button"
                  aria-label={`View ${category.name} Collection`}
                >
                  View Collection
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
