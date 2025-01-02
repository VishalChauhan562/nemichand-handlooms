import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Categories from './components/Categories/Categories';
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts';
import Newsletter from './components/Newsletter/Newsletter';
import Footer from './components/Footer/Footer';
// import './styles/main.scss';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header/>
      <Hero/>
      <Categories/>
      <FeaturedProducts />
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default App;