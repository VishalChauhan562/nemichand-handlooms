import { useEffect, useRef, useState } from "react";
import { ShoppingCart, User, Menu, Search, Bell, House } from "lucide-react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import React from "react";
import Notifications from "../Notifications/Notifications";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoutUser } from "../../store/slices/authSlice";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <NavLink to="/">
            <img src="/assets/Logo.jpeg" alt="Nemichand Handloom" />
          </NavLink>
        </div>

        <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `header__nav-link ${
                    isActive ? "header__nav-link--active" : ""
                  }`
                }
              >
                <House size={25} /> 
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink
                to="/new-arrivals"
                className={({ isActive }) =>
                  `header__nav-link ${
                    isActive ? "header__nav-link--active" : ""
                  }`
                }
              >
                New Arrivals 🆕
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink
                to="/shop-by-room"
                className={({ isActive }) =>
                  `header__nav-link ${
                    isActive ? "header__nav-link--active" : ""
                  }`
                }
              >
                Check All 😎
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink
                to="/sale"
                className={({ isActive }) =>
                  `header__nav-link ${
                    isActive ? "header__nav-link--active" : ""
                  } header__nav-link--sale`
                }
              >
                Sale
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header__actions">
          <button
            className="header__action-btn"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search size={25} />
          </button>
          <div className="header__user-menu" ref={userMenuRef}>
            <button
              className="header__action-btn"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <User size={25} />
            </button>
            {isUserMenuOpen && (
              <div className="header__dropdown">
                {isAuthenticated ? (
                  <>
                    <span className="header__dropdown-user">
                      {user?.first_name} {user?.last_name}
                    </span>
                    <NavLink to="/profile" className="header__dropdown-item">
                      Profile
                    </NavLink>
                    <button
                      className="header__dropdown-item"
                      onClick={() => dispatch(logoutUser())}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <NavLink to="/auth" className="header__dropdown-item">
                    Login
                  </NavLink>
                )}
              </div>
            )}
          </div>
          <NavLink to="/cart" className="header__action-btn header__cart">
            <ShoppingCart size={25} />
            <span className="header__cart-count">0</span>
          </NavLink>
          <Notifications />
          <button
            className="header__menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {isSearchOpen && (
        <div className="header__search">
          <input
            type="text"
            placeholder="Search products..."
            className="header__search-input"
            autoFocus
          />
        </div>
      )}
    </header>
  );
};

export default Header;
