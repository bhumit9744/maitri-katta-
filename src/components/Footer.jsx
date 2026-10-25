import React from 'react';
import './Footer.css';

// Verified Google Maps destination
const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/CPsP4TGnT36FcUMb8';
const CURRENT_YEAR = 2026;

export default function Footer({ onOpenBooking: _onOpenBooking }) {
  return (
    <footer className="editorial-site-footer" id="contact" aria-label="Restaurant Information and Contact">
      {/* ====================================================================
          1. UPPER ZONE — CINEMATIC PANORAMIC PHOTOGRAPH & SMOOTH IVORY CURVE
          ==================================================================== */}
      <div className="footer-panoramic-stage">
        {/* Genuine Maitri Katta Garden Restaurant Photograph at Night */}
        <img
          src="/assets/maitri-pergola-night.jpg"
          alt="Maitri Katta outdoor dining pergola illuminated with warm evening lanterns"
          className="panoramic-photo"
          loading="lazy"
        />

        {/* Soft top gradient to ensure text readability */}
        <div className="panoramic-top-gradient" aria-hidden="true" />

        {/* Upper-Right Caption */}
        <div className="panoramic-caption">
          <span className="caption-line">A LITTLE LONGER.</span>
          <span className="caption-line">A LITTLE HAPPIER.</span>
          <span className="caption-rule" aria-hidden="true" />
        </div>

        {/* Single Responsive Organic Ivory Curve SVG (No fragmented rectangles) */}
        <div className="panoramic-curve-divider" aria-hidden="true">
          <svg
            className="curve-divider-svg"
            viewBox="0 0 1440 140"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M 0,25 C 260,0 520,30 780,85 C 1020,135 1240,130 1440,95 L 1440,140 L 0,140 Z"
              fill="#F3EEE5"
            />
          </svg>
        </div>
      </div>

      {/* ====================================================================
          2. LOWER ZONE — WARM IVORY EDITORIAL FOOTER SPREAD
          ==================================================================== */}
      <div className="footer-editorial-lower">
        <div className="footer-content-wrapper">
          {/* BRAND BLOCK: Refined VITA LENTA-Inspired Display Typography */}
          <div className="footer-brand-section">
            <div className="brand-lockup-inner">
              {/* Display Wordmark with Natural Kerning & Restrained Proportions */}
              <div className="brand-wordmark-block">
                <h2 className="brand-wordmark-title">
                  <span className="wordmark-row">MAITRI</span>
                  <span className="wordmark-row">KATTA</span>
                </h2>
                <p className="brand-wordmark-sub">FAMILY GARDEN RESTAURANT</p>
              </div>

              {/* Thin Understated Terracotta Vertical Rule */}
              <div className="brand-divider-rule" aria-hidden="true" />

              {/* 3-Line Refined Italic Tagline */}
              <div className="brand-tagline-motto">
                <span>Good food.</span>
                <span>Good people.</span>
                <span>Time well spent.</span>
              </div>
            </div>
          </div>

          {/* Subtle Horizontal Divider */}
          <hr className="footer-divider-rule" />

          {/* FOUR BALANCED INFORMATION COLUMNS */}
          <div className="footer-info-grid">
            {/* Column 1: EXPLORE */}
            <div className="footer-info-col col-explore">
              <h3 className="info-col-title">EXPLORE</h3>
              <ul className="footer-nav-list">
                <li><a href="#home">Home</a></li>
                <li><a href="#experience">Our Story</a></li>
                <li><a href="#menu">Menu</a></li>
                <li><a href="#experience">Our Space</a></li>
                <li><a href="#celebrations">Celebrations</a></li>
                <li><a href="#location">Location</a></li>
              </ul>
            </div>

            {/* Column 2: CONTACT (Generous width for address) */}
            <div className="footer-info-col col-contact">
              <h3 className="info-col-title">CONTACT</h3>
              <div className="contact-details">
                <p className="contact-phone">
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </p>
                <p className="contact-email">
                  <a href="mailto:maitrikatta@gmail.com">maitrikatta@gmail.com</a>
                </p>
                <address className="contact-address">
                  <p className="address-line">Maitri Katta Family Garden Restaurant</p>
                  <p className="address-line">Next to Green City, Navare Nagar, Pipeline Road,</p>
                  <p className="address-line">Ambernath (West), Thane District, Maharashtra — 421501</p>
                </address>
              </div>
            </div>

            {/* Column 3: VISIT */}
            <div className="footer-info-col col-visit">
              <h3 className="info-col-title">VISIT</h3>
              <div className="visit-details">
                <p className="visit-label">Open Daily</p>
                <p className="visit-hours">11:00 AM – 11:00 PM</p>

                <div className="visit-directions-wrap">
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-footer-directions"
                    aria-label="Get driving directions to Maitri Katta on Google Maps (opens in new tab)"
                  >
                    <span>GET DIRECTIONS</span>
                    <span className="directions-arrow" aria-hidden="true">↗</span>
                  </a>
                  <span className="directions-underline" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Column 4: BRAND NOTE (Compact Editorial Unit) */}
            <div className="footer-info-col col-brand-note">
              <h3 className="info-col-title">BRAND NOTE</h3>
              <div className="brand-note-wrap">
                {/* Refined Subtle Botanical Line Illustration */}
                <svg className="brand-note-botanical" viewBox="0 0 24 55" fill="none" aria-hidden="true">
                  <path d="M 12 52 C 12 34, 13 18, 12 4" stroke="#A6533B" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M 12 40 C 7 35, 3 28, 8 23 C 13 26, 13 35, 12 40 Z" fill="#A6533B" opacity="0.85" />
                  <path d="M 12 30 C 17 26, 21 19, 16 14 C 11 17, 11 26, 12 30 Z" fill="#A6533B" opacity="0.85" />
                  <path d="M 12 18 C 8 14, 5 9, 9 5 C 13 7, 13 14, 12 18 Z" fill="#A6533B" opacity="0.85" />
                </svg>

                <span className="brand-note-rule" aria-hidden="true" />

                <div className="brand-note-content">
                  <p className="brand-note-quote">
                    A garden to dine, create and celebrate memories together.
                  </p>
                  <span className="brand-note-accent-line" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          {/* Subtle Bottom Divider */}
          <hr className="footer-divider-rule" />

          {/* COMPACT FOOTER BOTTOM STRIP */}
          <div className="footer-bottom-strip">
            <p className="bottom-copyright">
              © {CURRENT_YEAR} MAITRI KATTA FAMILY GARDEN RESTAURANT.
            </p>
            <p className="bottom-motto">
              GOOD FOOD. GOOD PEOPLE. TIME WELL SPENT.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
