// src/components/Header/Header.tsx
import { useState } from 'react';
import { ShoppingCart, User, Menu } from 'lucide-react';
import './Header.scss';

interface NavItem {
  label: string;
  path: string;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Bedsheets', path: '/bedsheets' },
    { label: 'Doormats', path: '/doormats' },
    { label: 'Floormats', path: '/floormats' },
    { label: 'Table Covers', path: '/table-covers' },
    { label: 'Runners', path: '/runners' }
  ];

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img src="/assets/Logo.jpeg" alt="" />
        </div>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            {navItems.map((item) => (
              <li key={item.path} className="header__nav-item">
                <a href={item.path} className="header__nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <button className="header__action-btn">
            <User size={24} />
          </button>
          <button className="header__action-btn">
            <ShoppingCart size={24} />
            <span className="header__cart-count">0</span>
          </button>
          <button 
            className="header__menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;