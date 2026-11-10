import React from 'react';
import { Link } from 'react-router-dom';
import { RESTAURANT_INFO } from '../../data/restaurantInfo';
import {
  MapPin,
  Clock,
  Phone,
  ArrowUpRight
} from 'lucide-react';
import './Footer.css';

// Minimal Instagram Outline Icon matching visual reference
function InstagramIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// WhatsApp Outline Icon for the CTA button matching reference
function WhatsAppIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path d="M9 10a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2" />
    </svg>
  );
}

// Organic yellow brush stroke centered under the slogan
function BrushStrokeUnderline() {
  return (
    <svg
      className="footer-yellow-brush"
      viewBox="0 0 140 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 12C32 6 78 5 134 8"
        stroke="#FFC900"
        strokeWidth="3.8"
        strokeLinecap="round"
      />
      <path
        d="M14 14C38 9 76 8 122 10"
        stroke="#FFC900"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

// Soft botanical leaf silhouette for top-left corner
function TopLeftFoliage() {
  return (
    <svg
      className="corner-foliage foliage-top-left"
      viewBox="0 0 260 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g opacity="0.22" filter="url(#foliage-blur-tl)">
        <path d="M-20 -10 C30 40 80 80 145 100" stroke="#4A060A" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="45" cy="30" rx="22" ry="9" transform="rotate(-25 45 30)" fill="#4A060A" />
        <ellipse cx="72" cy="52" rx="25" ry="10" transform="rotate(25 72 52)" fill="#360407" />
        <ellipse cx="98" cy="66" rx="24" ry="9" transform="rotate(-30 98 66)" fill="#4A060A" />
        <ellipse cx="124" cy="86" rx="22" ry="8" transform="rotate(20 124 86)" fill="#360407" />
        <ellipse cx="150" cy="102" rx="18" ry="7" transform="rotate(40 150 102)" fill="#4A060A" />
        <path d="M-10 20 C40 70 60 120 85 175" stroke="#4A060A" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="32" cy="75" rx="20" ry="8" transform="rotate(45 32 75)" fill="#360407" />
        <ellipse cx="52" cy="112" rx="22" ry="9" transform="rotate(-15 52 112)" fill="#4A060A" />
        <ellipse cx="70" cy="148" rx="19" ry="8" transform="rotate(50 70 148)" fill="#360407" />
        <ellipse cx="88" cy="180" rx="16" ry="7" transform="rotate(65 88 180)" fill="#4A060A" />
      </g>
      <defs>
        <filter id="foliage-blur-tl" x="-30" y="-20" width="300" height="250" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="2.8" />
        </filter>
      </defs>
    </svg>
  );
}

// Soft botanical leaf silhouette for bottom-right corner
function BottomRightFoliage() {
  return (
    <svg
      className="corner-foliage foliage-bottom-right"
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g opacity="0.22" filter="url(#foliage-blur-br)">
        <path d="M300 240 C240 180 180 130 110 90" stroke="#4A060A" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="230" cy="180" rx="24" ry="10" transform="rotate(-40 230 180)" fill="#4A060A" />
        <ellipse cx="195" cy="155" rx="26" ry="10" transform="rotate(25 195 155)" fill="#360407" />
        <ellipse cx="160" cy="125" rx="24" ry="9" transform="rotate(-35 160 125)" fill="#4A060A" />
        <ellipse cx="130" cy="105" rx="20" ry="8" transform="rotate(15 130 105)" fill="#360407" />
        <ellipse cx="105" cy="85" rx="18" ry="7" transform="rotate(-25 105 85)" fill="#4A060A" />
        <path d="M260 210 C210 190 170 185 140 195" stroke="#4A060A" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="205" cy="190" rx="20" ry="8" transform="rotate(10 205 190)" fill="#360407" />
        <ellipse cx="165" cy="190" rx="18" ry="7" transform="rotate(-20 165 190)" fill="#4A060A" />
        <ellipse cx="135" cy="198" rx="15" ry="6" transform="rotate(15 135 198)" fill="#4A060A" />
      </g>
      <defs>
        <filter id="foliage-blur-br" x="60" y="50" width="260" height="220" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="2.8" />
        </filter>
      </defs>
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="refined-footer-root footer-theme-red" aria-label="Restaurant Footer">
      {/* Subtle Botanical Leaf Silhouettes in Corners */}
      <TopLeftFoliage />
      <BottomRightFoliage />

      <div className="refined-footer-container">
        {/* =====================================================================
            1. BRAND IDENTITY & SLOGAN HEADER (Centered, Editorial)
            ===================================================================== */}
        <div className="refined-brand-header">
          {/* Prominent Centered Marathi Emblem Logo */}
          <div className="refined-logo-lockup">
            <Link to="/" className="refined-logo-link" aria-label="Maitri Katta Home">
              <img
                src="/assets/maitri-katta-logo-transparent.png"
                alt="Maitri Katta Original Marathi Emblem"
                className="refined-marathi-logo"
                width="140"
                height="95"
              />
            </Link>
          </div>

          {/* Slogan Row flanked by delicate lines */}
          <div className="refined-slogan-row">
            <span className="refined-slogan-line" aria-hidden="true" />
            <p className="refined-slogan-text">
              Good Food &nbsp;·&nbsp; Garden Vibes &nbsp;·&nbsp; Together Always
            </p>
            <span className="refined-slogan-line" aria-hidden="true" />
          </div>

          {/* Centered Yellow Brush Flourish */}
          <div className="refined-brush-container" aria-hidden="true">
            <BrushStrokeUnderline />
          </div>
        </div>

        {/* Thin Horizontal Red/Yellow Separator */}
        <hr className="refined-section-divider" aria-hidden="true" />

        {/* =====================================================================
            2. FOUR INFORMATION COLUMNS (Visit, Hours, Contact, Follow)
            ===================================================================== */}
        <div className="refined-info-grid" role="region" aria-label="Restaurant Details">
          {/* COLUMN 1: VISIT US */}
          <div className="refined-column col-visit">
            <div className="column-header-row">
              <span className="column-icon-disc">
                <MapPin size={18} strokeWidth={1.8} className="column-icon-glyph" />
              </span>
              <h4 className="column-heading">VISIT US</h4>
            </div>
            <address className="column-address-text">
              Pawar Section, Near Panvelkar Green City,<br />
              Navare Nagar, Ambernath East,<br />
              Maharashtra 421501.
            </address>
            <div className="column-action-wrap">
              <a
                href={RESTAURANT_INFO.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-directions"
              >
                <span>Get Directions</span>
                <ArrowUpRight size={13} className="btn-arrow" />
              </a>
            </div>
          </div>

          {/* COLUMN 2: OPEN DAILY */}
          <div className="refined-column col-hours">
            <div className="column-header-row">
              <span className="column-icon-disc">
                <Clock size={18} strokeWidth={1.8} className="column-icon-glyph" />
              </span>
              <h4 className="column-heading">OPEN DAILY</h4>
            </div>
            <div className="column-highlight-time">
              12 PM – 12 AM
            </div>
            <p className="column-subtext">
              Lunch, Dinner &amp; Celebrations
            </p>
            <span className="yellow-accent-dash" aria-hidden="true" />
          </div>

          {/* COLUMN 3: GET IN TOUCH */}
          <div className="refined-column col-contact">
            <div className="column-header-row">
              <span className="column-icon-disc">
                <Phone size={18} strokeWidth={1.8} className="column-icon-glyph" />
              </span>
              <h4 className="column-heading">GET IN TOUCH</h4>
            </div>
            <a
              href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
              className="column-highlight-phone"
            >
              {RESTAURANT_INFO.phone}
            </a>
            <p className="column-subtext">
              Table Reservations &amp; Group Bookings
            </p>
            <span className="yellow-accent-dash" aria-hidden="true" />
          </div>

          {/* COLUMN 4: FOLLOW ALONG */}
          <div className="refined-column col-social">
            <div className="column-header-row">
              <span className="column-icon-disc">
                <InstagramIcon size={18} />
              </span>
              <h4 className="column-heading">FOLLOW ALONG</h4>
            </div>
            <a
              href={RESTAURANT_INFO.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="column-insta-handle"
            >
              @maitri_katta_restaurant
            </a>
            <div className="column-action-wrap">
              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-whatsapp"
              >
                <WhatsAppIcon size={15} />
                <span>Order on WhatsApp</span>
                <ArrowUpRight size={13} className="btn-arrow" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. FLOWING ORGANIC WAVE & CONTRASTING BOTTOM STRIP
          ===================================================================== */}
      <div className="refined-closing-strip">
        {/* Flowing Organic Wave Transition into Mustard-Yellow Bottom Strip */}
        <div className="closing-wave-box" aria-hidden="true">
          <svg
            viewBox="0 0 1440 68"
            fill="none"
            preserveAspectRatio="none"
            className="closing-wave-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Crest highlight accent */}
            <path
              d="M0 24 C140 14 300 12 480 23 L480 27 C300 16 140 18 0 28 Z"
              fill="#FFE066"
            />
            {/* Flowing Mustard Yellow Wave */}
            <path
              d="M0 26 C160 16 340 15 540 28 C740 41 980 49 1440 32 V68 H0 Z"
              fill="#FFC900"
            />
          </svg>
        </div>

        {/* Mustard Yellow Bottom Bar with Deep Red/Brown Text & Brand Signature */}
        <div className="closing-bottom-bar">
          <div className="refined-footer-container closing-inner-row">
            {/* Centered Brand Signature */}
            <div className="bottom-signature-lockup">
              <span className="signature-flank-line" aria-hidden="true" />
              <span className="signature-brand-text">MAITRI KATTA</span>
              <span className="signature-bullet">·</span>
              <span className="signature-city-text">AMBERNATH</span>
              <span className="signature-bullet">·</span>
              <span className="signature-tagline">KHANA BHI. KAHANI BHI.</span>
              <span className="signature-flank-line" aria-hidden="true" />
            </div>

            {/* Copyright Note */}
            <div className="bottom-copyright-text">
              <span>© {currentYear} Maitri Katta Family Garden Restaurant.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
