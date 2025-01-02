// src/components/Footer/Footer.tsx
import { Facebook, Twitter, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__company">
            <h3 className="footer__logo">Nemichand Handlooms</h3>
            <p className="footer__description">
              Bringing traditional handloom craftsmanship to modern homes since 1990.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link">
                <Facebook size={20} />
              </a>
              <a href="#" className="footer__social-link">
                <Twitter size={20} />
              </a>
              <a href="#" className="footer__social-link">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="footer__links">
            <div className="footer__links-column">
              <h4 className="footer__column-title">Products</h4>
              <ul className="footer__list">
                <li><a href="/bedsheets">Bedsheets</a></li>
                <li><a href="/doormats">Doormats</a></li>
                <li><a href="/floormats">Floormats</a></li>
                <li><a href="/table-covers">Table Covers</a></li>
              </ul>
            </div>

            <div className="footer__links-column">
              <h4 className="footer__column-title">Customer Care</h4>
              <ul className="footer__list">
                <li><a href="/shipping">Shipping Policy</a></li>
                <li><a href="/returns">Returns & Exchange</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/track-order">Track Order</a></li>
              </ul>
            </div>

            <div className="footer__links-column">
              <h4 className="footer__column-title">Contact Us</h4>
              <ul className="footer__list">
                <li className="footer__contact-item">
                  <Phone size={16} />
                  <span>+91 98765 43210</span>
                </li>
                <li className="footer__contact-item">
                  <Mail size={16} />
                  <span>support@nemichand.com</span>
                </li>
                <li className="footer__contact-item">
                  <MapPin size={16} />
                  <span>123 Handloom Street, Textile Market, City - 400001</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__legal">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
          <p className="footer__copyright">
            © {currentYear} Nemichand Handlooms. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;