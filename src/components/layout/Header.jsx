import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { RESTAURANT_INFO } from '../../data/restaurantInfo';
import { ShoppingBag, Menu as MenuIcon, X, MessageCircle, Phone } from 'lucide-react';
import './Header.css';

export default function Header() {
  const { totalCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHomepage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/menu', label: 'MENU' },
    { to: '/about', label: 'OUR STORY' },
    { to: '/gallery', label: 'GALLERY' },
    { to: '/contact', label: 'CONTACT' },
  ];

  // At top of homepage, fully transparent floating. When scrolled or on inner pages, dark translucent glass.
  const hasTranslucentBg = scrolled || !isHomepage;

  return (
    <header
      className={`floating-navbar ${hasTranslucentBg ? 'is-scrolled' : 'is-transparent'}`}
      role="banner"
    >
      <div className="navbar-inner">
        {/* =====================================================================
            1. BRAND LOGO (LEFT ALIGNED)
            ===================================================================== */}
        <Link to="/" className="navbar-brand" aria-label="Maitri Katta Home">
          <img
            src="/assets/maitri-katta-logo-transparent.png"
            alt="Maitri Katta Marathi Logo"
            className="navbar-brand-logo"
            width="160"
            height="80"
          />
        </Link>

        {/* =====================================================================
            2. DESKTOP NAVIGATION (CENTERED)
            ===================================================================== */}
        <nav className="navbar-menu" aria-label="Primary Navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `navbar-link ${isActive ? 'is-active' : ''}`
              }
            >
              <span className="navbar-link-text">{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* =====================================================================
            3. ACTIONS CLUSTER (RIGHT ALIGNED)
            ===================================================================== */}
        <div className="navbar-actions">
          {/* Phone (Minimal Text & Icon) */}
          <a
            href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
            className="navbar-phone"
            title="Call Maitri Katta"
          >
            <Phone size={14} className="navbar-phone-icon" />
            <span className="navbar-phone-text">{RESTAURANT_INFO.phone}</span>
          </a>

          {/* WhatsApp CTA (Clean Yellow Button) */}
          <a
            href={RESTAURANT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-navbar-whatsapp"
            title="Order directly on WhatsApp"
          >
            <MessageCircle size={15} className="wa-btn-icon" />
            <span>ORDER ON WHATSAPP</span>
          </a>

          {/* Cart Trigger (Minimal Outline Bag) */}
          <button
            type="button"
            className="navbar-cart-trigger"
            onClick={openCart}
            aria-label={`Open Cart (${totalCount} items)`}
            title="View Cart"
          >
            <ShoppingBag size={20} strokeWidth={1.8} />
            {totalCount > 0 && (
              <span className="navbar-cart-count" aria-label={`${totalCount} items`}>
                {totalCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="navbar-hamburger"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <MenuIcon size={25} />
          </button>
        </div>
      </div>

      {/* =====================================================================
          4. MOBILE NAVIGATION OVERLAY
          ===================================================================== */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-overlay" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <div className="mobile-overlay-topbar">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="mobile-topbar-brand">
              <img
                src="/assets/maitri-katta-logo-transparent.png"
                alt="Maitri Katta"
                className="mobile-topbar-logo"
                width="110"
                height="55"
              />
            </Link>

            <button
              type="button"
              className="mobile-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Navigation Menu"
            >
              <X size={26} />
            </button>
          </div>

          <div className="navbar-mobile-content">
            <nav className="navbar-mobile-links" aria-label="Mobile Navigation Links">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `navbar-mobile-item ${isActive ? 'is-active' : ''}`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mobile-item-label">{link.label}</span>
                  <span className="mobile-item-arrow">→</span>
                </NavLink>
              ))}
            </nav>

            <div className="navbar-mobile-actions">
              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-mobile-whatsapp"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageCircle size={18} />
                <span>ORDER ON WHATSAPP</span>
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
                className="btn-mobile-phone"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Phone size={15} />
                <span>Call {RESTAURANT_INFO.phone}</span>
              </a>
            </div>

            <div className="navbar-mobile-footer">
              <span>Ambernath East · Open 12 PM – 12 AM Daily</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
