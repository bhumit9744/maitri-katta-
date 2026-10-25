import React, { useState, useEffect } from 'react';
import { Calendar, X, MapPin, Clock, Phone } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME', href: '#home' },
    { id: 'menu', label: 'MENU', href: '#menu' },
    { id: 'space', label: 'OUR SPACE', href: '#experience' },
    { id: 'celebrations', label: 'CELEBRATIONS', href: '#celebrations' },
    { id: 'events', label: 'EVENTS', href: '#events' },
    { id: 'contact', label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e, item) => {
    setActiveNav(item.id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header-container">
          {/* Left: Authentic Logo + Refined Descriptor */}
          <a href="#home" className="brand-group" onClick={(e) => handleNavClick(e, { id: 'home' })}>
            <div className="brand-logo-frame">
              <img
                src="/assets/maitri-katta-logo-transparent.png"
                alt="मैत्री कट्टा - Maitri Katta Logo"
                className="brand-logo-img"
                width="84"
                height="42"
              />
            </div>
            <div className="brand-divider"></div>
            <div className="brand-descriptor">
              <span>FAMILY GARDEN</span>
              <span>RESTAURANT</span>
            </div>
          </a>

          {/* Center: Desktop Editorial Navigation */}
          <nav className="desktop-nav" aria-label="Primary Navigation">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.id} className="nav-item">
                  <a
                    href={item.href}
                    className={`nav-link ${activeNav === item.id ? 'is-active' : ''}`}
                    onClick={(e) => handleNavClick(e, item)}
                  >
                    {item.label}
                    {activeNav === item.id && <span className="nav-active-indicator" />}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: Restrained Book a Table CTA + Minimalist Menu Icon */}
          <div className="header-actions">
            <button
              type="button"
              className="btn-book-table"
              onClick={onOpenBooking}
              aria-label="Book a table at Maitri Katta"
            >
              <Calendar size={15} strokeWidth={1.8} className="btn-icon" />
              <span>BOOK A TABLE</span>
            </button>

            <button
              type="button"
              className="btn-menu-icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <div className="menu-icon-circle">
                <span className={`bar bar-top ${mobileMenuOpen ? 'open' : ''}`}></span>
                <span className={`bar bar-mid ${mobileMenuOpen ? 'open' : ''}`}></span>
                <span className={`bar bar-bot ${mobileMenuOpen ? 'open' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Side Editorial Drawer */}
      <div
        className={`drawer-backdrop ${mobileMenuOpen ? 'is-open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />
      <aside className={`editorial-drawer ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Mobile Navigation">
        <div className="drawer-header">
          <div className="drawer-brand">
            <img
              src="/assets/maitri-katta-logo-transparent.png"
              alt="Maitri Katta"
              className="drawer-logo"
            />
            <div className="drawer-title">
              <h4>MAITRI KATTA</h4>
              <p>Ambernath, Maharashtra</p>
            </div>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Menu"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="drawer-nav">
          <ul className="drawer-links">
            {navItems.map((item, idx) => (
              <li key={item.id} style={{ transitionDelay: `${idx * 40}ms` }}>
                <a
                  href={item.href}
                  className={`drawer-link ${activeNav === item.id ? 'is-active' : ''}`}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  <span className="drawer-index">0{idx + 1}</span>
                  <span className="drawer-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="drawer-footer">
          <div className="drawer-meta-item">
            <MapPin size={16} strokeWidth={1.7} />
            <span>Near Navare Nagar, Ambernath (W), Maharashtra</span>
          </div>
          <div className="drawer-meta-item">
            <Clock size={16} strokeWidth={1.7} />
            <span>Daily: 1:00 PM – 12:00 AM (Midnight)</span>
          </div>
          <div className="drawer-meta-item">
            <Phone size={16} strokeWidth={1.7} />
            <span>+91 98200 00000 / Dineout Bookings</span>
          </div>

          <button
            type="button"
            className="drawer-book-btn"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
          >
            Reserve Your Garden Table
          </button>
        </div>
      </aside>
    </>
  );
}
